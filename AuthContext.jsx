import React, { createContext, useState, useEffect, useContext } from 'react';
import { initPi, authenticate } from '../lib/pi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [pi, setPi] = useState(null);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setup = async () => {
      try {
        const piInstance = await initPi();
        setPi(piInstance);
        if (piInstance) {
          // User must explicitly sign in — Pi SDK sandbox doesn't persist sessions
        }
      } catch (err) {
        setError('Failed to initialize Pi SDK');
      } finally {
        setLoading(false);
      }
    };
    setup();
  }, []);

  const signIn = async () => {
    try {
      const { user: piUser, accessToken: token } = await authenticate();
      setUser(piUser);
      setAccessToken(token);
    } catch (err) {
      setError('Sign in failed');
    }
  };

  const signOut = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ pi, user, accessToken, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);