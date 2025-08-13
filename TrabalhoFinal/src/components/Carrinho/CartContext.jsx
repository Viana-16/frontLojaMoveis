import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from "../UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Carrega o carrinho do localStorage
  useEffect(() => {
    if (user?.email) {
      const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
      setCart(carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []);
      setCarregado(true);
    } else {
      setCart([]);
      setCarregado(false);
    }
  }, [user?.email]);

  // Salva o carrinho no localStorage
  useEffect(() => {
    if (user?.email && carregado) {
      localStorage.setItem(`carrinho_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user, carregado]);

  // Adiciona ou incrementa item
  const addToCart = useCallback((produto) => {
    setCart(prevCart => {
      const jaExiste = prevCart.find((p) => p.id === produto.id);
      if (jaExiste) {
        return prevCart.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCart, { ...produto, quantidade: 1 }];
    });
  }, []);

  // Remove item específico
  const removeFromCart = useCallback((id) => {
    setCart(prevCart => prevCart.filter((item) => item.id !== id));
  }, []);

  // Remove múltiplos itens de uma vez (novo)
  const removeItemsFromCart = (itemIdsToRemove) => {
  const updatedCart = cart.filter(item => !itemIdsToRemove.includes(item.id));
  setCart(updatedCart);

  // Atualiza o localStorage (usando o e-mail do usuário para identificar o carrinho correto)
  const cliente = JSON.parse(localStorage.getItem('cliente'));
  if (cliente?.email) {
    localStorage.setItem(`carrinho_${cliente.email}`, JSON.stringify(updatedCart));
  }
};


  // Limpa carrinho completamente
  const clearCart = useCallback(() => {
    setCart([]);
    if (user?.email) {
      localStorage.removeItem(`carrinho_${user.email}`);
    }
  }, [user?.email]);

  // Aumenta quantidade
  const increaseQuantity = useCallback((id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  }, []);

  // Diminui quantidade
  const decreaseQuantity = useCallback((id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantidade > 1 
          ? { ...item, quantidade: item.quantidade - 1 } 
          : item
      )
    );
  }, []);

  // Calcula total do carrinho
  const cartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }, [cart]);

  // Calcula total de itens selecionados (novo)
  const selectedCartTotal = useCallback((selectedItems) => {
    return cart.reduce((total, item) => {
      return selectedItems.includes(item.id) 
        ? total + (item.preco * item.quantidade) 
        : total;
    }, 0);
  }, [cart]);

  // Conta todos os itens no carrinho
  const itemCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantidade, 0);
  }, [cart]);

  // Conta itens selecionados (novo)
  const selectedItemCount = useCallback((selectedItems) => {
    return cart.reduce((count, item) => {
      return selectedItems.includes(item.id) 
        ? count + item.quantidade 
        : count;
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart,
        removeItemsFromCart, // Função nova
        clearCart, 
        increaseQuantity, 
        decreaseQuantity,
        cartTotal,
        selectedCartTotal, // Função nova
        itemCount,
        selectedItemCount, // Função nova
        isCartLoaded: carregado // Adicionando estado de carregamento
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);