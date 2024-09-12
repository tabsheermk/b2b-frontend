import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createContext } from 'react';
import App from './App.jsx';
import './index.css';


export const server = import.meta.env.VITE_SERVER_URL;

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [isSeller, setIsSeller] = React.useState(false);

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
