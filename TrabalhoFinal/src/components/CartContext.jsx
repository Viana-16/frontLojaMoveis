import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [carregado, setCarregado] = useState(false); // garante que carregamento só acontece 1x por login

  // ⚠️ Só carrega quando user estiver pronto
  useEffect(() => {
  if (user?.email) {
    const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
    setCart(carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []);
    setCarregado(true);
  } else {
    setCart([]);
    setCarregado(false); // <- ESSA LINHA É IMPORTANTE
  }
}, [user?.email]);


  useEffect(() => {
    if (user?.email && carregado) {
      localStorage.setItem(`carrinho_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user, carregado]);

  const addToCart = (produto) => {
    const jaExiste = cart.find((p) => p.id === produto.id);
    if (jaExiste) {
      const atualizado = cart.map((item) =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
      setCart(atualizado);
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    if (user?.email) {
      localStorage.removeItem(`carrinho_${user.email}`);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);