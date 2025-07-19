import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";

const PedidosUsuarios = () => {
  const { user } = useContext(UserContext);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://localhost:7252/api/Pedido/por-email/${user.email}`)
        .then(res => res.json())
        .then(data => setPedidos(data))
        .catch(() => alert("Erro ao buscar pedidos."));
    }
  }, [user]);

  if (!user) {
    return <p>Você precisa estar logado para ver seus pedidos.</p>;
  }

  if (!pedidos.length) {
    return <p>Nenhum pedido encontrado.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>
      {pedidos.map((pedido, idx) => (
        <div key={idx} className="border p-4 rounded-lg mb-4 shadow">
          <p className="text-sm text-gray-500">Data: {new Date(pedido.dataPedido).toLocaleDateString()}</p>
          <p className="font-semibold text-blue-600">Status: {pedido.status}</p>
          <div className="mt-2 space-y-1">
            {pedido.produtos.map((produto, i) => (
              <div key={i} className="flex justify-between">
                <span>{produto.nome} (x{produto.quantidade})</span>
                <span>R$ {produto.preco.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="font-bold mt-2">Total: R$ {pedido.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default PedidosUsuarios;
