// import React from "react";
// import { useCart } from "../components/CartContext";
// import "./Carrinho.css"; // Criaremos esse CSS também
// import { useNavigate } from "react-router-dom";

// const Carrinho = () => {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const precoTotal = cart.reduce((total, item) => total + item.preco * item.quantidade, 0);

//   const finalizarCompra = () => {
//     alert("Compra finalizada com sucesso!");
//     clearCart();
//     navigate("/"); // Redireciona para home ou outra página
//   };

//   return (
//     <div className="carrinho-container">
//       <h2>Meu Carrinho</h2>

//       {cart.length === 0 ? (
//         <p>Seu carrinho está vazio.</p>
//       ) : (
//         <>
//           <div className="carrinho-itens">
//             {cart.map((item) => (
//               <div className="carrinho-item" key={item.id}>
//                 <img src={item.imagemUrl.startsWith('http') ? item.imagemUrl : `https://localhost:7252/${item.imagemUrl}`} alt={item.nome} />
//                 <div className="info">
//                   <h3>{item.nome}</h3>
//                   <p>Preço unitário: R$ {item.preco.toFixed(2)}</p>
//                   <p>Quantidade: {item.quantidade}</p>
//                   <p>Total: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
//                   <button onClick={() => removeFromCart(item.id)}>Remover</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="carrinho-resumo">
//             <h3>Total da compra: R$ {precoTotal.toFixed(2)}</h3>
//             <button className="finalizar" onClick={finalizarCompra}>
//               Finalizar Compra
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Carrinho;


import React from "react";
import { useCart } from "../components/CartContext";
import "./Carrinho.css";
import { useNavigate } from "react-router-dom";

const Carrinho = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity } = useCart();
  const navigate = useNavigate();

  const precoTotal = cart.reduce((total, item) => total + item.preco * item.quantidade, 0);

  const finalizarCompra = () => {
    alert("Compra finalizada com sucesso!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="carrinho-container">
      <h2>Meu Carrinho</h2>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="carrinho-itens">
            {cart.map((item) => (
              <div className="carrinho-item" key={item.id}>
                <img
                  src={item.imagemUrl.startsWith("http") ? item.imagemUrl : `https://localhost:7252/${item.imagemUrl}`}
                  alt={item.nome}
                />
                <div className="info">
                  <h3>{item.nome}</h3>
                  <p>Preço unitário: R$ {item.preco.toFixed(2)}</p>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Total: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  <button onClick={() => increaseQuantity(item.id)}>+1</button>
                  <button onClick={() => removeFromCart(item.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrinho-resumo">
            <h3>Total da compra: R$ {precoTotal.toFixed(2)}</h3>
            <button className="finalizar" onClick={finalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrinho;



