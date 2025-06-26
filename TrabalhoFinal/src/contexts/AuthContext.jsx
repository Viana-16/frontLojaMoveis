import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho"));

    if (usuarioSalvo) setUsuario(usuarioSalvo);
    if (carrinhoSalvo) setCarrinho(carrinhoSalvo);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    setCarrinho([]);
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrinho");
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, carrinho, adicionarAoCarrinho }}
    >
      {children}
    </AuthContext.Provider>
  );
};
