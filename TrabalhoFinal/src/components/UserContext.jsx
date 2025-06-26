// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Carregar usuário salvo no cookie (login persistente)
//   useEffect(() => {
//     const token = Cookies.get('jwt');
//     if (token) {
//       fetchUserProfile(token);
//     }
//   }, []);

//   const fetchUserProfile = async (token) => {
//   try {
//     const res = await fetch('https://localhost:7252/api/Login/perfil', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       }
//     });

//     if (res.ok) {
//       const data = await res.json();
//       setUser(data);
//     } else {
//       setUser(null);
//     }
//   } catch (error) {
//     console.error('Erro ao buscar perfil:', error);
//     setUser(null);
//   }
// };

//   const login = (userData) => {
//     Cookies.set('jwt', userData.token, { expires: 7 }); // 7 dias de validade
//     setUser(userData);
//   };

//   const logout = () => {
//     Cookies.remove('jwt');
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Inicializa usuário do localStorage para persistência
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('cliente');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const token = Cookies.get('jwtToken');

    if (token) {
      fetchUserProfile();
    } else {
      setUser(null);
      localStorage.removeItem('cliente');
    }
  }, []);

  // Busca perfil para validar token e obter dados do usuário
  const fetchUserProfile = async () => {
    try {
      const res = await fetch('https://localhost:7252/api/Login/perfil', {
        method: 'GET',
        credentials: 'include', // essencial para enviar cookie HttpOnly
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
    // O token também está no cookie HttpOnly (setado pelo backend),
    // mas para uso imediato armazenamos no localStorage e no estado
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
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
  return context;
};

const handleLogout = () => {
  logout();                    // limpa cookie, localStorage e contexto
  navigate('/login');          // redireciona para página de login
  window.location.reload();    // força reset da aplicação (garante que contexto seja limpo)
};




