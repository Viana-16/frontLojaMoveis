import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import '../../components/MeuPerfil/PedidosUsuario.css';

const PedidosUsuarios = () => {
  const { user } = useContext(UserContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'info' // 'info', 'success', 'error'
  });

  useEffect(() => {
    if (user?.email) {
      const emailEncoded = encodeURIComponent(user.email);
      setLoading(true);
      
      fetch(`https://lojamoveis.onrender.com/api/Pedido/por-email/${emailEncoded}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao buscar pedidos.");
          return res.json();
        })
        .then(data => setPedidos(data))
        .catch(() => {
          showModal('Erro', '❌ Erro ao buscar seus pedidos.', 'error');
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const showModal = (title, message, type = 'info') => {
    setModal({
      show: true,
      title,
      message,
      type
    });
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  if (!user) return <p className="pedidos-usuario__message">Você precisa estar logado para ver seus pedidos.</p>;

  if (loading) return <p className="pedidos-usuario__message">Carregando seus pedidos...</p>;

  if (!pedidos.length) return <p className="pedidos-usuario__message">Nenhum pedido encontrado.</p>;

  return (
    <div className="pedidos-usuario">
      {/* Modal */}
      {modal.show && (
        <div className="pedidos-usuario__modal">
          <div className="pedidos-usuario__modal-content">
            <div className={`pedidos-usuario__modal-header pedidos-usuario__modal-header--${modal.type}`}>
              <h3>{modal.title}</h3>
              <button onClick={closeModal} className="pedidos-usuario__modal-close">
                &times;
              </button>
            </div>
            <div className="pedidos-usuario__modal-body">
              <p>{modal.message}</p>
            </div>
            <div className="pedidos-usuario__modal-footer">
              <button 
                onClick={closeModal}
                className={`pedidos-usuario__modal-button pedidos-usuario__modal-button--${modal.type}`}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="pedidos-usuario__title">Meus Pedidos</h1>

      {pedidos.map((pedido, idx) => (
        <div key={idx} className="pedidos-usuario__card">
          <div className="pedidos-usuario__card-header">
            <span className="pedidos-usuario__order-date">
              {new Date(pedido.dataPedido).toLocaleDateString("pt-BR")} às{" "}
              {new Date(pedido.dataPedido).toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'})}
            </span>
            <span className={`pedidos-usuario__status pedidos-usuario__status--${pedido.status?.toLowerCase() || 'pendente'}`}>
              {pedido.status || "Pendente"}
            </span>
          </div>

          <div className="pedidos-usuario__products">
            {pedido.produtos.map((produto, i) => (
              <div key={i} className="pedidos-usuario__product">
                <span className="pedidos-usuario__product-name">
                  {produto.nome} (x{produto.quantidade})
                </span>
                <span className="pedidos-usuario__product-price">
                  R$ {(produto.preco * produto.quantidade).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pedidos-usuario__total">
            Total do Pedido: R$ {pedido.total.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PedidosUsuarios;