// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useUser } from "./UserContext";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useUser();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     if (user) {
//       const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
//       setCart(carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`carrinho_${user.email}`, JSON.stringify(cart));
//     }
//   }, [cart, user]);

//   const addToCart = (produto) => {
//     const existente = cart.find((item) => item.id === produto.id);
//     if (existente) {
//       setCart(
//         cart.map((item) =>
//           item.id === produto.id
//             ? { ...item, quantidade: item.quantidade + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...produto, quantidade: 1 }]);
//     }
//   };

//   const increaseQuantity = (id) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
//       )
//     );
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//     if (user) {
//       localStorage.removeItem(`carrinho_${user.email}`);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


// CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  // 🔒 Aguarda o "user" estar pronto antes de carregar
  useEffect(() => {
  if (user?.email) {
    const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
    if (carrinhoSalvo) {
      try {
        setCart(JSON.parse(carrinhoSalvo));
      } catch {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }
}, [user]);

  // 🧠 Salva no localStorage apenas se tiver user
  useEffect(() => {
  if (user?.email) {
    const carrinhoSalvo = localStorage.getItem(`carrinho_${user.email}`);
    if (carrinhoSalvo) {
      setCart(JSON.parse(carrinhoSalvo));
    } else {
      setCart([]); // garante que pelo menos zere
    }
  }
}, [user]);


  const addToCart = (produto) => {
    const existente = cart.find((item) => item.id === produto.id);
    if (existente) {
      setCart(
        cart.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    if (user && user.email) {
      localStorage.removeItem(`carrinho_${user.email}`);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
