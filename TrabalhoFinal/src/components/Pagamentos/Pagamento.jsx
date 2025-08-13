import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Carrinho/CartContext";
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

  if (metodo === "credito" && !camposValidos()) {
    showAlertModal("Atenção", "Preencha todos os dados do cartão corretamente.", true);
    return;
  }

  setCarregando(true);

  try {
    // Simulação do pagamento
    if (metodo === "credito") {
      // Simula validação do cartão (exemplo: se CVV começa com 0, erro)
      if (form.cvv.startsWith("0")) {
        throw new Error("Cartão recusado pelo banco");
      }
      // Você pode aqui integrar com um gateway real, por enquanto simula sucesso
      await new Promise((res) => setTimeout(res, 1500)); // espera 1.5s simulando process.
    }

    if (metodo === "pix") {
      // Simula um tempo para o cliente pagar via Pix (ex: esperar 3s)
      await new Promise((res) => setTimeout(res, 3000));
      // Aqui você poderia checar no backend se pagamento via Pix foi confirmado
      // Por enquanto, vamos supor que deu certo
    }

    // Agora salva o pedido no backend
    const res = await fetch("https://lojamoveis.onrender.com/api/Pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });

    if (res.ok) {
      const produtosComprados = pedido.produtos.map((p) => p.produtoId);
      removeItemsFromCart(produtosComprados);
      showAlertModal("Sucesso!", "Pagamento confirmado e pedido finalizado com sucesso!");
      setTimeout(() => navigate("/", { state: { fromPayment: true } }), 2000);
    } else {
      const erro = await res.text();
      showAlertModal("Erro", `Erro ao salvar pedido: ${erro}`, true);
    }
  } catch (error) {
    showAlertModal("Erro", error.message || "Erro no processamento do pagamento.", true);
  } finally {
    setCarregando(false);
  }
};

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

          {/* <div className="method-option">
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
          </div> */}
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

        {/* {metodo === "pix" && (
          <div className="pix-container">
            <h3 className="pix-title">Pagamento via Pix</h3>
            <p className="pix-instructions">
              Escaneie o QR Code abaixo ou utilize a chave Pix para realizar o pagamento
            </p>
            <div className="qr-code-placeholder">
      <img 
        src="/qr-code.png" 
        alt="QR Code Pix" 
        className="qr-code-image"
      />
    </div>
    <p className="pix-key">
      <strong>Chave Pix:</strong> moveisclassic@gmail.com
    </p>
          </div>
        )} */}

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