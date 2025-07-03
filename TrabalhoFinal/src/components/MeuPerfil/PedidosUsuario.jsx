import React from 'react';

const PedidosUsuario = ({ pedidos }) => {
  return pedidos.length ? (
    <div className="grid-pedidos">
      {pedidos.map((p, i) => (
        <article key={i} className="card">
          <p><strong>ID:</strong> {p.id}</p>
          <p><strong>Data:</strong> {new Date(p.dataPedido).toLocaleDateString()}</p>
          <p><strong>Total:</strong> R$ {p.total.toFixed(2)}</p>
          <p><strong>Status:</strong> {p.status}</p>
        </article>
      ))}
    </div>
  ) : <p>Você ainda não fez nenhum pedido.</p>;
};

export default PedidosUsuario;
