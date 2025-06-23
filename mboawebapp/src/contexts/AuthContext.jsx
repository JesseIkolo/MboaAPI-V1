import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si une session existe au chargement de l'app
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get('/users/me');
        setUser(data);
      } catch (error) {
        // Pas de session valide, l'utilisateur n'est pas connecté
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/users/login', credentials);
    setUser(data.user);
    // La redirection sera gérée par le composant qui appelle login
    return data.user; 
  };

  const logout = async () => {
    await api.post('/users/logout');
    setUser(null);
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