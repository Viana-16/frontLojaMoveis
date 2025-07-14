import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Pagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pedido = location.state?.pedido;

  if (!pedido) {
    return <p>Pedido não encontrado. Tente novamente.</p>;
  }

  const confirmarPagamento = async () => {
    try {
      const res = await fetch("https://localhost:7252/api/Pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });

      if (res.ok) {
        alert("✅ Pagamento confirmado e pedido salvo!");
        navigate("/"); // ou para /pedidos
      } else {
        const erro = await res.text();
        alert("❌ Erro ao salvar pedido: " + erro);
      }
    } catch (err) {
      alert("❌ Erro ao conectar com servidor.");
    }
  };

  return (
    <div className="pagina-pagamento">
      <h2>Pagamento</h2>
      <p>Total a pagar: <strong>R$ {pedido.total.toFixed(2)}</strong></p>

      <button onClick={confirmarPagamento}>Confirmar Pagamento</button>
      <button onClick={() => navigate(-1)}>Cancelar</button>
    </div>
  );
};

export default Pagamento;