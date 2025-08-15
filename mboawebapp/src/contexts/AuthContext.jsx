import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si une session existe au chargement de l'app
    const checkLoggedIn = async () => {
      try {
        console.log('[AuthContext] checkLoggedIn start');
        const { data } = await api.get('/users/me');
        console.log('[AuthContext] checkLoggedIn ok', data);
        setUser(data);
      } catch (error) {
        // Pas de session valide, l'utilisateur n'est pas connecté
        console.warn('[AuthContext] checkLoggedIn no session', error?.response?.status, error?.message);
        setUser(null);
      } finally {
        console.log('[AuthContext] checkLoggedIn finished');
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      console.log('[AuthContext] login() request', credentials);
      const { data } = await api.post('/users/login', credentials);
      console.log('[AuthContext] login() response', data);
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      setUser(data?.user || null);
      // La redirection sera gérée par le composant qui appelle login
      return data?.user || null;
    } catch (error) {
      const payload = error?.response?.data || { message: error?.message || 'Login error' };
      console.error('[AuthContext] login() error', payload);
      // Important: relancer l'erreur pour que le composant appelant affiche la notification et stoppe son loader
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Toujours supprimer le token et l'utilisateur, même en cas d'erreur
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 