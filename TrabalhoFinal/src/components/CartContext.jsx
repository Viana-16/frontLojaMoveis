// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useUser } from "./UserContext";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useUser();
//   const [cart, setCart] = useState([]);
//   const [carregado, setCarregado] = useState(false); // garante que carregamento só acontece 1x por login

//   // ⚠️ Só carrega quando user estiver pronto
//   useEffect(() => {
//   if (user?.email) {
//     const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
//     setCart(carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []);
//     setCarregado(true);
//   } else {
//     setCart([]);
//     setCarregado(false); // <- ESSA LINHA É IMPORTANTE
//   }
// }, [user?.email]);


//   useEffect(() => {
//     if (user?.email && carregado) {
//       localStorage.setItem(`carrinho_${user.email}`, JSON.stringify(cart));
//     }
//   }, [cart, user, carregado]);

//   const addToCart = (produto) => {
//     const jaExiste = cart.find((p) => p.id === produto.id);
//     if (jaExiste) {
//       const atualizado = cart.map((item) =>
//         item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
//       );
//       setCart(atualizado);
//     } else {
//       setCart([...cart, { ...produto, quantidade: 1 }]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//     if (user?.email) {
//       localStorage.removeItem(`carrinho_${user.email}`);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useUser } from "./UserContext";

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

  // Remove item
  const removeFromCart = useCallback((id) => {
    setCart(prevCart => prevCart.filter((item) => item.id !== id));
  }, []);

  // Limpa carrinho
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

  // Calcula total
  const cartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }, [cart]);

  // Conta itens
  const itemCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantidade, 0);
  }, [cart]);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        increaseQuantity, 
        decreaseQuantity,
        cartTotal,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);