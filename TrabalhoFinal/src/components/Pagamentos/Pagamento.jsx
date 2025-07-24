import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../components/CartContext";

const Pagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const pedido = location.state?.pedido;

  const [metodo, setMetodo] = useState("credito");
  const [form, setForm] = useState({ numeroCartao: "", validade: "", cvv: "" });
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const camposValidos = () => {
    if (metodo === "credito") {
      return (
        form.numeroCartao.trim().length >= 16 &&
        form.validade.trim().length >= 4 &&
        form.cvv.trim().length >= 3
      );
    }
    return true;
  };
  
  const handlePagamento = async () => {
  const response = await fetch('http://localhost:5000/api/pagamento/criar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuarioEmail: usuario.email,
      produtos: carrinho
    })
  });

  const data = await response.json();
  window.location.href = data.init_point; // redireciona pro checkout do Mercado Pago
};

  const finalizarPedido = async () => {
    if (!pedido || !camposValidos()) {
      alert("❌ Preencha todos os dados obrigatórios corretamente.");
      return;
    }

    setCarregando(true);

    try {
      // Simula tempo de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      const res = await fetch("https://localhost:7252/api/Pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (res.ok) {
        alert("✅ Pagamento confirmado e pedido finalizado!");
        clearCart();
        navigate("/");
      } else {
        const erro = await res.text();
        alert("❌ Erro ao salvar pedido: " + erro);
      }
    } catch (error) {
      alert("❌ Erro de conexão com servidor.");
    } finally {
      setCarregando(false);
    }
  };

  if (!pedido) return <p>Nenhum pedido encontrado.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Pagamento</h2>

      <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

      <div>
        <label>
          <input
            type="radio"
            name="metodo"
            value="credito"
            checked={metodo === "credito"}
            onChange={() => setMetodo("credito")}
          />
          Cartão de Crédito
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="metodo"
            value="pix"
            checked={metodo === "pix"}
            onChange={() => setMetodo("pix")}
          />
          Pix
        </label>
      </div>

      {metodo === "credito" && (
        <div style={{ marginTop: "1rem" }}>
          <label>
            Número do Cartão:<br />
            <input
              type="text"
              name="numeroCartao"
              value={form.numeroCartao}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
              style={{ width: "100%" }}
            />
          </label><br />
          <label>
            Validade:<br />
            <input
              type="text"
              name="validade"
              value={form.validade}
              onChange={handleChange}
              placeholder="MM/AA"
              required
              style={{ width: "100%" }}
            />
          </label><br />
          <label>
            CVV:<br />
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              required
              style={{ width: "100%" }}
            />
          </label>
        </div>
      )}

      {metodo === "pix" && (
        <div style={{ marginTop: "1rem" }}>
          <p>Escaneie o QR Code ou use a chave Pix abaixo:</p>
          <img
            src="https://via.placeholder.com/200x200.png?text=QR+Code"
            alt="QR Code Pix"
          />
          <p><strong>Chave:</strong> exemplo@pix.com</p>
        </div>
      )}

      <button
        onClick={finalizarPedido}
        style={{
          marginTop: "1.5rem",
          padding: "0.8rem 1.5rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
        disabled={carregando || (metodo === "credito" && !camposValidos())}
      >
        {carregando ? "Processando..." : "Confirmar Pagamento"}
      </button>

      {carregando && (
        <div style={{ marginTop: "1rem" }}>
          <p>Aguarde, finalizando pedido...</p>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Pagamento;
