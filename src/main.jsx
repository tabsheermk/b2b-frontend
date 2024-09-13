import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createContext } from 'react';
import App from './App.jsx';
import './index.css';
import axios from 'axios';
import { useEffect } from 'react';

export const server = import.meta.env.VITE_SERVER_URL;

export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [isSeller, setIsSeller] = React.useState(false);


  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/sellers/me`, { withCredentials: true });
      if (data) {
        setIsSeller(true);
        setUser(data.user);
      } 
    } catch {
      try {
        const { data } = await axios.get(`${server}/api/v1/buyers/me`, { withCredentials: true });
        if (data) {
          setIsSeller(false);
          setUser(data.user);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        isSeller,
        setIsSeller
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
