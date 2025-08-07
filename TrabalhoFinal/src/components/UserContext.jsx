import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const salvo = localStorage.getItem("cliente");
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  // Reforça persistência ao montar o componente
  useEffect(() => {
    const savedUser = localStorage.getItem('cliente');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('https://lojamoveis.onrender.com/api/Login/perfil', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem('cliente', JSON.stringify(data));
      } else {
        setUser(null);
        localStorage.removeItem('cliente');
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      setUser(null);
      localStorage.removeItem('cliente');
    }
  };

  const login = (userData) => {
    Cookies.set('jwtToken', userData.token, { expires: 7 });
    setUser(userData);
    localStorage.setItem('cliente', JSON.stringify(userData));
  };

  const logout = () => {
    Cookies.remove('jwtToken');
    setUser(null);
    localStorage.removeItem('cliente');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
  return context;
};
