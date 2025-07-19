// import React from "react";
// import { useCart } from "../components/CartContext";
// import { useNavigate } from "react-router-dom";
// import "./Carrinho.css";

// const Carrinho = () => {
//   const { 
//     cart, 
//     removeFromCart, 
//     clearCart, 
//     increaseQuantity, 
//     decreaseQuantity,
//     cartTotal,
//     itemCount
//   } = useCart();
//   const navigate = useNavigate();

//   const finalizarCompra = () => {
//     alert(`Compra de ${itemCount()} itens no valor total de R$ ${cartTotal().toFixed(2)} finalizada com sucesso!`);
//     clearCart();
//     navigate("/");
//   };

//   return (
//     <div className="carrinho-container">
//       <div className="carrinho-header">
//         <h2>Meu Carrinho</h2>
//         {cart.length > 0 && (
//           <span className="item-count">{itemCount()} {itemCount() === 1 ? 'item' : 'itens'}</span>
//         )}
//       </div>

//       {cart.length === 0 ? (
//         <div className="carrinho-vazio">
//           <p>Seu carrinho está vazio</p>
//           <button className="btn-continuar" onClick={() => navigate("/")}>
//             Continuar Comprando
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="carrinho-itens">
//             {cart.map((item) => (
//               <div className="carrinho-item" key={item.id}>
//                 <div className="item-imagem">
//                   <img
//                     src={item.imagemUrl.startsWith("http") ? item.imagemUrl : `https://localhost:7252/${item.imagemUrl}`}
//                     alt={item.nome}
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/150?text=Produto+Sem+Imagem';
//                     }}
//                   />
//                 </div>
//                 <div className="item-info">
//                   <h3>{item.nome}</h3>
//                   <p className="preco-unitario">R$ {item.preco.toFixed(2)}</p>
                  
//                   <div className="quantidade-controller">
//                     <button onClick={() => decreaseQuantity(item.id)}>-</button>
//                     <span>{item.quantidade}</span>
//                     <button onClick={() => increaseQuantity(item.id)}>+</button>
//                   </div>
                  
//                   <p className="preco-total">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  
//                   <button 
//                     className="btn-remover" 
//                     onClick={() => removeFromCart(item.id)}
//                     aria-label={`Remover ${item.nome} do carrinho`}
//                   >
//                     <i className="fas fa-trash"></i> Remover
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="carrinho-resumo">
//             <div className="resumo-detalhes">
//               <h3>Resumo do Pedido</h3>
//               <div className="resumo-linha">
//                 <span>Subtotal ({itemCount()} itens):</span>
//                 <span>R$ {cartTotal().toFixed(2)}</span>
//               </div>
//               <div className="resumo-linha">
//                 <span>Frete:</span>
//                 <span>Grátis</span>
//               </div>
//               <div className="resumo-linha total">
//                 <span>Total:</span>
//                 <span>R$ {cartTotal().toFixed(2)}</span>
//               </div>
//             </div>
            
//             <div className="acoes-carrinho">
//               <button className="btn-continuar" onClick={() => navigate("/")}>
//                 Continuar Comprando
//               </button>
//               <button className="btn-limpar" onClick={clearCart}>
//                 Limpar Carrinho
//               </button>
//               <button className="btn-finalizar" onClick={finalizarCompra}>
//                 Finalizar Compra
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Carrinho;



import React from "react";
import { useUser } from '../components/UserContext';
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import "./Carrinho.css";

const Carrinho = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    increaseQuantity, 
    decreaseQuantity,
    cartTotal,
    itemCount
  } = useCart();

  const { user } = useUser();

  const navigate = useNavigate();

 const finalizarCompra = () => {
  if (!cart.length || !user?.email) return;

  const pedido = {
    email: user.email,
    produtos: cart.map(item => ({
      produtoId: item.id,
      nome: item.nome,
      preco: item.preco,
      quantidade: item.quantidade
    })),
    total: cartTotal(),
    dataPedido: new Date().toISOString(),
    status: "Pendente"
  };

  navigate("/pagamento", { state: { pedido } });
};



  return (
    <div className="carrinho-container">
      <div className="carrinho-header">
        <h2>Meu Carrinho</h2>
        {cart.length > 0 && (
          <span className="item-count">{itemCount()} {itemCount() === 1 ? 'item' : 'itens'}</span>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="carrinho-vazio">
          <p>Seu carrinho está vazio</p>
          <button className="btn-continuar" onClick={() => navigate("/")}>
            Continuar Comprando
          </button>
        </div>
      ) : (
        <>
          <div className="carrinho-itens">
            {cart.map((item) => (
              <div className="carrinho-item" key={item.id}>
                <div className="item-imagem">
                  <img
                    src={item.imagemUrl.startsWith("http") ? item.imagemUrl : `https://localhost:7252/${item.imagemUrl}`}
                    alt={item.nome}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Produto+Sem+Imagem';
                    }}
                  />
                </div>
                <div className="item-info">
                  <h3>{item.nome}</h3>
                  <p className="preco-unitario">R$ {item.preco.toFixed(2)}</p>
                  
                  <div className="quantidade-controller">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  
                  <p className="preco-total">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  
                  <button 
                    className="btn-remover" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remover ${item.nome} do carrinho`}
                  >
                    <i className="fas fa-trash"></i> Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrinho-resumo">
            <div className="resumo-detalhes">
              <h3>Resumo do Pedido</h3>
              <div className="resumo-linha">
                <span>Subtotal ({itemCount()} itens):</span>
                <span>R$ {cartTotal().toFixed(2)}</span>
              </div>
              <div className="resumo-linha">
                <span>Frete:</span>
                <span>Grátis</span>
              </div>
              <div className="resumo-linha total">
                <span>Total:</span>
                <span>R$ {cartTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="acoes-carrinho">
              <button className="btn-continuar" onClick={() => navigate("/")}>
                Continuar Comprando
              </button>
              <button className="btn-limpar" onClick={clearCart}>
                Limpar Carrinho
              </button>
              <button className="btn-finalizar" onClick={finalizarCompra}>
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrinho;