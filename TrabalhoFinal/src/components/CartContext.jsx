// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useUser } from "./UserContext";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useUser();
//   const [cart, setCart] = useState([]);
//   const [carregado, setCarregado] = useState(false); // garante que carregamento só acontece 1x por login

//   // ⚠️ Só carrega quando user estiver pronto
//   useEffect(() => {
//     if (user?.email && !carregado) {
//       const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
//       if (carrinhoSalvo) {
//         setCart(JSON.parse(carrinhoSalvo));
//       } else {
//         setCart([]);
//       }
//       setCarregado(true);
//     }
//   }, [user, carregado]);

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



import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  // Detecta se o usuário já carregou
  useEffect(() => {
    if (user !== undefined) {
      setReady(true);
    }
  }, [user]);

  // Carrega carrinho baseado no email quando o usuário estiver pronto
  useEffect(() => {
    if (ready && user?.email) {
      const salvo = localStorage.getItem(`carrinho_${user.email}`);
      setCart(salvo ? JSON.parse(salvo) : []);
    } else if (ready) {
      setCart([]);
    }
  }, [user?.email, ready]);

  // Salva automaticamente ao alterar o carrinho
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`carrinho_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user?.email]);

  const addToCart = (produto) => {
    if (!user?.email) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }

    const existe = cart.find((p) => p.id === produto.id);
    if (existe) {
      setCart(cart.map(p =>
        p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
      ));
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(p =>
      p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
    ));
  };

  const clearCart = () => {
    setCart([]);
    if (user?.email) {
      localStorage.removeItem(`carrinho_${user.email}`);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

