// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../../components/CartContext";

// const Pagamento = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { removeItemsFromCart } = useCart();
//   const pedido = location.state?.pedido;


//   const [metodo, setMetodo] = useState("credito");
//   const [form, setForm] = useState({ numeroCartao: "", validade: "", cvv: "" });
//   const [carregando, setCarregando] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const camposValidos = () => {
//     if (metodo === "credito") {
//       return (
//         form.numeroCartao.trim().length >= 16 &&
//         form.validade.trim().length >= 4 &&
//         form.cvv.trim().length >= 3
//       );
//     }
//     return true;
//   };
  
//   const handlePagamento = async () => {
//   const response = await fetch('http://localhost:5000/api/pagamento/criar', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       usuarioEmail: usuario.email,
//       produtos: carrinho
//     })
//   });

//   const data = await response.json();
//   window.location.href = data.init_point; // redireciona pro checkout do Mercado Pago
// };

//   const finalizarPedido = async () => {
//   if (!pedido || !camposValidos()) {
//     alert("❌ Preencha todos os dados obrigatórios corretamente.");
//     return;
//   }

//   setCarregando(true);

//   try {
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     const res = await fetch("https://localhost:7252/api/Pedido", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(pedido),
//     });

//     if (res.ok) {
//   const produtosComprados = pedido.produtos.map(p => p.produtoId);
//   removeItemsFromCart(produtosComprados); // <- Remove os itens comprados do carrinho

//   alert("✅ Pagamento confirmado e pedido finalizado!");
//   navigate("/", { state: { fromPayment: true } });
// }
//  else {
//       const erro = await res.text();
//       alert("❌ Erro ao salvar pedido: " + erro);
//     }
//   } catch (error) {
//     alert("❌ Erro de conexão com servidor.");
//   } finally {
//     setCarregando(false);
//   }
//   };

//   if (!pedido) return <p>Nenhum pedido encontrado.</p>;

//   return (
//     <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
//       <h2>Pagamento</h2>

//       <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

//       <div>
//         <label>
//           <input
//             type="radio"
//             name="metodo"
//             value="credito"
//             checked={metodo === "credito"}
//             onChange={() => setMetodo("credito")}
//           />
//           Cartão de Crédito
//         </label>
//         <br />
//         <label>
//           <input
//             type="radio"
//             name="metodo"
//             value="pix"
//             checked={metodo === "pix"}
//             onChange={() => setMetodo("pix")}
//           />
//           Pix
//         </label>
//       </div>

//       {metodo === "credito" && (
//         <div style={{ marginTop: "1rem" }}>
//           <label>
//             Número do Cartão:<br />
//             <input
//               type="text"
//               name="numeroCartao"
//               value={form.numeroCartao}
//               onChange={handleChange}
//               placeholder="1234 5678 9012 3456"
//               required
//               style={{ width: "100%" }}
//             />
//           </label><br />
//           <label>
//             Validade:<br />
//             <input
//               type="text"
//               name="validade"
//               value={form.validade}
//               onChange={handleChange}
//               placeholder="MM/AA"
//               required
//               style={{ width: "100%" }}
//             />
//           </label><br />
//           <label>
//             CVV:<br />
//             <input
//               type="text"
//               name="cvv"
//               value={form.cvv}
//               onChange={handleChange}
//               placeholder="123"
//               required
//               style={{ width: "100%" }}
//             />
//           </label>
//         </div>
//       )}

//       {metodo === "pix" && (
//         <div style={{ marginTop: "1rem" }}>
//           <p>Escaneie o QR Code ou use a chave Pix abaixo:</p>
//           <img
//             src="https://via.placeholder.com/200x200.png?text=QR+Code"
//             alt="QR Code Pix"
//           />
//           <p><strong>Chave:</strong> exemplo@pix.com</p>
//         </div>
//       )}

//       <button
//         onClick={finalizarPedido}
//         style={{
//           marginTop: "1.5rem",
//           padding: "0.8rem 1.5rem",
//           backgroundColor: "#4CAF50",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer"
//         }}
//         disabled={carregando || (metodo === "credito" && !camposValidos())}
//       >
//         {carregando ? "Processando..." : "Confirmar Pagamento"}
//       </button>

//       {carregando && (
//         <div style={{ marginTop: "1rem" }}>
//           <p>Aguarde, finalizando pedido...</p>
//           <div className="loader"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pagamento;



import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../components/CartContext";
import "./Pagamento.css";

const Pagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeItemsFromCart } = useCart();
  const pedido = location.state?.pedido;

  const [metodo, setMetodo] = useState("credito");
  const [form, setForm] = useState({ numeroCartao: "", validade: "", cvv: "" });
  const [carregando, setCarregando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ 
    title: "", 
    message: "", 
    isError: false 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Formatação automática para campos do cartão
    if (name === "numeroCartao") {
      const formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setForm({ ...form, [name]: formattedValue });
    } else if (name === "validade") {
      const formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      setForm({ ...form, [name]: formattedValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const camposValidos = () => {
    if (metodo === "credito") {
      const numeroLimpo = form.numeroCartao.replace(/\s/g, "");
      return (
        numeroLimpo.length === 16 &&
        form.validade.length === 5 &&
        form.cvv.length >= 3
      );
    }
    return true;
  };

  const showAlertModal = (title, message, isError = false) => {
    setModalContent({ title, message, isError });
    setShowModal(true);
  };

  const finalizarPedido = async () => {
    if (!pedido) {
      showAlertModal("Erro", "Nenhum pedido encontrado.", true);
      return;
    }

    if (!camposValidos()) {
      showAlertModal("Atenção", "Preencha todos os dados obrigatórios corretamente.", true);
      return;
    }

    setCarregando(true);

    try {
      const res = await fetch("https://localhost:7252/api/Pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (res.ok) {
        const produtosComprados = pedido.produtos.map(p => p.produtoId);
        removeItemsFromCart(produtosComprados);
        showAlertModal("Sucesso!", "Pagamento confirmado e pedido finalizado com sucesso!");
        setTimeout(() => navigate("/", { state: { fromPayment: true } }), 2000);
      } else {
        const erro = await res.text();
        showAlertModal("Erro", `Erro ao salvar pedido: ${erro}`, true);
      }
    } catch (error) {
      showAlertModal("Erro", "Erro de conexão com o servidor.", true);
    } finally {
      setCarregando(false);
    }
  };

  if (!pedido) {
    return (
      <div className="empty-container">
        <p className="empty-message">Nenhum pedido encontrado.</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Voltar para a loja
        </button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Finalizar Pagamento</h2>
          <p className="total-amount">Total: R$ {pedido.total.toFixed(2)}</p>
        </div>

        <div className="payment-methods">
          <div className="method-option">
            <input
              type="radio"
              id="credito"
              name="metodo"
              value="credito"
              className="radio-input"
              checked={metodo === "credito"}
              onChange={() => setMetodo("credito")}
            />
            <label htmlFor="credito" className="radio-label">Cartão de Crédito</label>
          </div>

          <div className="method-option">
            <input
              type="radio"
              id="pix"
              name="metodo"
              value="pix"
              className="radio-input"
              checked={metodo === "pix"}
              onChange={() => setMetodo("pix")}
            />
            <label htmlFor="pix" className="radio-label">Pix</label>
          </div>
        </div>

        {metodo === "credito" && (
          <div className="credit-card-form">
            <div className="form-group">
              <label htmlFor="numeroCartao" className="form-label">Número do Cartão</label>
              <input
                type="text"
                id="numeroCartao"
                name="numeroCartao"
                className="form-input"
                value={form.numeroCartao}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label htmlFor="validade" className="form-label">Validade</label>
                <input
                  type="text"
                  id="validade"
                  name="validade"
                  className="form-input"
                  value={form.validade}
                  onChange={handleChange}
                  placeholder="MM/AA"
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="form-input"
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {metodo === "pix" && (
          <div className="pix-container">
            <h3 className="pix-title">Pagamento via Pix</h3>
            <p className="pix-instructions">
              Escaneie o QR Code abaixo ou utilize a chave Pix para realizar o pagamento
            </p>
            <div className="qr-code-placeholder">
              <img 
                src="/qr-code-placeholder.png" 
                alt="QR Code Pix" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;base64,...";
                }}
              />
            </div>
            <p className="pix-key">
              <strong>Chave Pix:</strong> exemplo@pix.com
            </p>
          </div>
        )}

        <button
          className="submit-button"
          onClick={finalizarPedido}
          disabled={carregando || (metodo === "credito" && !camposValidos())}
        >
          {carregando ? (
            <>
              <div className="spinner"></div> Processando...
            </>
          ) : (
            "Confirmar Pagamento"
          )}
        </button>
      </div>

      {/* Modal de Alerta */}
      <div className={`modal-overlay ${showModal ? "" : "hidden"}`}>
        <div className="modal">
          <div className={`modal-header ${modalContent.isError ? "error" : "success"}`}>
            <h3 className={`modal-title ${modalContent.isError ? "error" : "success"}`}>
              {modalContent.title}
            </h3>
            <button className="close-button" onClick={() => setShowModal(false)}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className={`modal-icon ${modalContent.isError ? "error" : "success"}`}>
              {modalContent.isError ? "!" : "✓"}
            </div>
            <p className="modal-message">{modalContent.message}</p>
          </div>
          <div className="modal-footer">
            <button 
              className="modal-button"
              onClick={() => {
                setShowModal(false);
                if (!modalContent.isError && modalContent.title === "Sucesso!") {
                  navigate("/", { state: { fromPayment: true } });
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;