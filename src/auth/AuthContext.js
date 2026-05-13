import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = apiClient.getTokenFromStorage();
        if (token) {
          const user = await apiClient.getCurrentUser();
          setCurrentUser(user);
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
        apiClient.setTokenInStorage(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const register = useCallback(async (email, username, password) => {
    try {
      setError(null);
      const user = await apiClient.register(email, username, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      const user = await apiClient.login(email, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const loginWithGoogle = useCallback(async (googleId, email, displayName) => {
    try {
      setError(null);
      const user = await apiClient.loginWithGoogle(googleId, email, displayName);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const loginWithGithub = useCallback(async (githubId, email, displayName, login) => {
    try {
      setError(null);
      const user = await apiClient.loginWithGithub(githubId, email, displayName, login);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await apiClient.logout();
      setCurrentUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    loginWithGithub,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
