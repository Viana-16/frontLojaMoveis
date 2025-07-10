import React, { useEffect, useState } from 'react';
import { useUser } from "../UserContext";'' // Certifique-se de usar corretamente o contexto
import './PedidosUsuario.css'; // Se desejar estilizar

const PedidosUsuario = () => {
  const { user } = useUser();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`https://localhost:7252/api/Pedido/usuario/${user.email}`);
        if (!res.ok) throw new Error('Erro ao buscar pedidos');
        const data = await res.json();
        setPedidos(data);
      } catch (err) {
        setErro('❌ Não foi possível carregar seus pedidos.');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    fetchPedidos();
  }, [user]);

  if (carregando) return <p>🔄 Carregando pedidos...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return pedidos.length ? (
    <div className="grid-pedidos">
      {pedidos.map((pedido) => (
        <article key={pedido.id} className="card-pedido">
          <p><strong>ID do Pedido:</strong> {pedido.id}</p>
          <p><strong>Data:</strong> {new Date(pedido.data).toLocaleDateString()}</p>
          <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
          <p><strong>Produtos:</strong></p>
          <ul>
            {pedido.itens.map((item, i) => (
              <li key={i}>
                {item.nome} — {item.quantidade} x R$ {item.preco.toFixed(2)} = R$ {(item.preco * item.quantidade).toFixed(2)}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  ) : (
    <p>Você ainda não fez nenhum pedido.</p>
  );
};

export default PedidosUsuario;

