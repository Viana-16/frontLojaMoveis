import React, { useState } from 'react';
import './RastrearPedido.css';

const Rastrear = () => {
  const [codigo, setCodigo] = useState('');
  const [status, setStatus] = useState('');

  const rastrearPedido = () => {
    // Simula status fixo — você pode substituir por chamada de API futuramente
    if (codigo === '12345') {
      setStatus('Pedido em trânsito — previsão de entrega: 10/05/2025');
    } else if (codigo.trim() !== '') {
      setStatus('Pedido não encontrado. Verifique o código.');
    } else {
      setStatus('');
    }
  };

  return (
    <div className="rastrear-container">
      <h2>Rastrear Pedido</h2>
      <input
        type="text"
        placeholder="Digite o número do pedido"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button onClick={rastrearPedido}>Rastrear</button>

      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default Rastrear;
