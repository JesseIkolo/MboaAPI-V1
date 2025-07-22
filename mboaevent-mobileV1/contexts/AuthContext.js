import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();
const AUTH_KEY = 'isAuthenticated';

async function getItem(key) {
  if (Platform.OS === 'web') {
    return window.localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
}

async function setItem(key, value) {
  if (Platform.OS === 'web') {
    window.localStorage.setItem(key, value);
    return;
  }
  return await SecureStore.setItemAsync(key, value);
}

async function deleteItem(key) {
  if (Platform.OS === 'web') {
    window.localStorage.removeItem(key);
    return;
  }
  return await SecureStore.deleteItemAsync(key);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    (async () => {
      const value = await getItem(AUTH_KEY);
      setIsAuthenticated(value === 'true');
    })();
  }, []);

  const login = async () => {
    await setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await deleteItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020931',
  },
});

export function useAuth() {
  return useContext(AuthContext);
}