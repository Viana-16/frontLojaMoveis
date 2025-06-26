// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useUser } from './UserContext';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const { user } = useUser();
//   const [carrinho, setCarrinho] = useState([]);

//   useEffect(() => {
//     if (user) {
//       const salvo = localStorage.getItem(`carrinho-${user.email}`);
//       setCarrinho(salvo ? JSON.parse(salvo) : []);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`carrinho-${user.email}`, JSON.stringify(carrinho));
//     }
//   }, [carrinho, user]);

//   const adicionarAoCarrinho = (produto) => {
//     setCarrinho((prevCarrinho) => {
//       const index = prevCarrinho.findIndex(p => p.id === produto.id);

//       if (index !== -1) {
//         // Produto já está no carrinho, aumenta a quantidade
//         const novoCarrinho = [...prevCarrinho];
//         novoCarrinho[index].quantidade += 1;
//         return novoCarrinho;
//       } else {
//         // Novo produto com quantidade 1
//         return [...prevCarrinho, { ...produto, quantidade: 1 }];
//       }
//     });
//   };

//   return (
//     <CartContext.Provider value={{ carrinho, adicionarAoCarrinho }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }




import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  // Carregar carrinho do localStorage quando usuário estiver disponível
  useEffect(() => {
    if (user) {
      const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
      if (carrinhoSalvo) {
        setCart(JSON.parse(carrinhoSalvo));
      } else {
        setCart([]);
      }
    }
  }, [user]);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem(`carrinho_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

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
    if (user) {
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
