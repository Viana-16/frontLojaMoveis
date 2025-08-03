// import React, { useState, useEffect } from 'react';
// import './PedidosAdmin.css';

// const PedidosAdmin = () => {
//   const [pedidos, setPedidos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [emailFiltro, setEmailFiltro] = useState('');
//   const [statusFiltro, setStatusFiltro] = useState('todos');
//   const [atualizando, setAtualizando] = useState(null);

//   const carregarPedidos = async () => {
//     try {
//       setLoading(true);
//       let url = 'https://localhost:7252/api/Pedido';
      
//       if (emailFiltro) {
//         const emailEncoded = encodeURIComponent(emailFiltro);
//         url = `https://localhost:7252/api/Pedido/por-email/${emailEncoded}`;
//       }

//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Erro ao carregar pedidos');
      
//       const data = await response.json();
//       setPedidos(data);
//     } catch (error) {
//       console.error('Erro:', error);
//       alert('Falha ao carregar pedidos: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const atualizarStatus = async (pedidoId, novoStatus) => {
//     try {
//       setAtualizando(pedidoId);
//       const pedidoAtualizado = {
//         ...pedidos.find(p => p.id === pedidoId),
//         status: novoStatus
//       };

//       const response = await fetch(`https://localhost:7252/api/Pedido/${pedidoId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(pedidoAtualizado),
//       });

//       if (!response.ok) throw new Error('Falha ao atualizar');
      
//       setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, status: novoStatus } : p));
//       alert('Status atualizado com sucesso!');
//     } catch (error) {
//       console.error('Erro:', error);
//       alert('Falha ao atualizar status: ' + error.message);
//     } finally {
//       setAtualizando(null);
//     }
//   };

//   const pedidosFiltrados = statusFiltro === 'todos' 
//     ? pedidos 
//     : pedidos.filter(p => p.status === statusFiltro);

//   const getStatusClass = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pendente': return 'pedido-status--pendente';
//       case 'enviado': return 'pedido-status--enviado';
//       case 'finalizado': return 'pedido-status--finalizado';
//       case 'cancelado': return 'pedido-status--cancelado';
//       default: return 'pedido-status--default';
//     }
//   };

//   return (
//     <div className="pedidos-admin">
//       <h1 className="pedidos-admin__title">Painel de Pedidos</h1>
      
//       <div className="pedidos-admin__filters">
//         <div className="pedidos-admin__filter-group">
//           <label>Filtrar por Email:</label>
//           <input
//             type="text"
//             value={emailFiltro}
//             onChange={(e) => setEmailFiltro(e.target.value)}
//             placeholder="Email do cliente"
//             className="pedidos-admin__input"
//           />
//         </div>
        
//         <div className="pedidos-admin__filter-group">
//           <label>Status:</label>
//           <select
//             value={statusFiltro}
//             onChange={(e) => setStatusFiltro(e.target.value)}
//             className="pedidos-admin__select"
//           >
//             <option value="todos">Todos</option>
//             <option value="pendente">Pendente</option>
//             <option value="enviado">Enviado</option>
//             <option value="finalizado">Finalizado</option>
//             <option value="cancelado">Cancelado</option>
//           </select>
//         </div>
        
//         <button 
//           onClick={carregarPedidos} 
//           disabled={loading}
//           className="pedidos-admin__button"
//         >
//           {loading ? 'Carregando...' : 'Buscar'}
//         </button>
//       </div>

//       <div className="pedidos-admin__table-container">
//         {pedidosFiltrados.length === 0 ? (
//           <p className="pedidos-admin__empty">
//             {loading ? 'Carregando...' : 'Nenhum pedido encontrado'}
//           </p>
//         ) : (
//           <table className="pedidos-admin__table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Email</th>
//                 <th>Data</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Ação</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pedidosFiltrados.map(pedido => (
//                 <tr key={pedido.id}>
//                   <td>{pedido.id}</td>
//                   <td>{pedido.email}</td>
//                   <td>{new Date(pedido.dataPedido).toLocaleDateString()}</td>
//                   <td>R$ {pedido.total.toFixed(2)}</td>
//                   <td>
//                     <span className={`pedido-status ${getStatusClass(pedido.status)}`}>
//                       {pedido.status}
//                     </span>
//                   </td>
//                   <td>
//                     <select
//                       value={pedido.status}
//                       onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
//                       disabled={atualizando === pedido.id}
//                       className="pedidos-admin__select"
//                     >
//                       <option value="pendente">Pendente</option>
//                       <option value="enviado">Enviado</option>
//                       <option value="finalizado">Finalizado</option>
//                       <option value="cancelado">Cancelado</option>
//                     </select>
//                     {atualizando === pedido.id && <span>Atualizando...</span>}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PedidosAdmin;


import React, { useState, useEffect } from 'react';
import './PedidosAdmin.css';

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailFiltro, setEmailFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos');
  const [atualizando, setAtualizando] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'info' // 'info', 'success', 'error'
  });

  const carregarPedidos = async () => {
    try {
      setLoading(true);
      let url = 'https://localhost:7252/api/Pedido';
      
      if (emailFiltro) {
        const emailEncoded = encodeURIComponent(emailFiltro);
        url = `https://localhost:7252/api/Pedido/por-email/${emailEncoded}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar pedidos');
      }
      
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro:', error);
      showModal('Erro', 'Falha ao carregar pedidos: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatus = async (pedidoId, novoStatus) => {
    try {
      setAtualizando(pedidoId);
      
      const pedidoAtualizado = {
        ...pedidos.find(p => p.id === pedidoId),
        status: novoStatus
      };

      const response = await fetch(`https://localhost:7252/api/Pedido/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoAtualizado),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar');
      }

      setPedidos(pedidos.map(p => 
        p.id === pedidoId ? { ...p, status: novoStatus } : p
      ));
      
      showModal('Sucesso', 'Status atualizado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro:', error);
      showModal('Erro', 'Falha ao atualizar status: ' + error.message, 'error');
    } finally {
      setAtualizando(null);
    }
  };

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

  const pedidosFiltrados = statusFiltro === 'todos' 
    ? pedidos 
    : pedidos.filter(p => p.status === statusFiltro);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pendente': return 'pedido-status--pendente';
      case 'enviado': return 'pedido-status--enviado';
      case 'finalizado': return 'pedido-status--finalizado';
      case 'cancelado': return 'pedido-status--cancelado';
      default: return 'pedido-status--default';
    }
  };

  return (
    <div className="pedidos-admin">
      {/* Modal */}
      {modal.show && (
        <div className="pedidos-admin__modal">
          <div className="pedidos-admin__modal-content">
            <div className={`pedidos-admin__modal-header pedidos-admin__modal-header--${modal.type}`}>
              <h3>{modal.title}</h3>
              <button onClick={closeModal} className="pedidos-admin__modal-close">
                &times;
              </button>
            </div>
            <div className="pedidos-admin__modal-body">
              <p>{modal.message}</p>
            </div>
            <div className="pedidos-admin__modal-footer">
              <button 
                onClick={closeModal}
                className={`pedidos-admin__modal-button pedidos-admin__modal-button--${modal.type}`}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <h1 className="pedidos-admin__title">Painel de Pedidos</h1>
      
      <div className="pedidos-admin__filters">
        <div className="pedidos-admin__filter-group">
          <label>Filtrar por Email:</label>
          <input
            type="text"
            value={emailFiltro}
            onChange={(e) => setEmailFiltro(e.target.value)}
            placeholder="Email do cliente"
            className="pedidos-admin__input"
          />
        </div>
        
        <div className="pedidos-admin__filter-group">
          <label>Status:</label>
          <select
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
            className="pedidos-admin__select"
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="enviado">Enviado</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        
        <button 
          onClick={carregarPedidos} 
          disabled={loading}
          className="pedidos-admin__button"
        >
          {loading ? 'Carregando...' : 'Buscar'}
        </button>
      </div>

      <div className="pedidos-admin__table-container">
        {pedidosFiltrados.length === 0 ? (
          <p className="pedidos-admin__empty">
            {loading ? 'Carregando...' : 'Nenhum pedido encontrado'}
          </p>
        ) : (
          <table className="pedidos-admin__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Data</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map(pedido => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.email}</td>
                  <td>{new Date(pedido.dataPedido).toLocaleDateString()}</td>
                  <td>R$ {pedido.total.toFixed(2)}</td>
                  <td>
                    <span className={`pedido-status ${getStatusClass(pedido.status)}`}>
                      {pedido.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={pedido.status}
                      onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                      disabled={atualizando === pedido.id}
                      className="pedidos-admin__select"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="enviado">Enviado</option>
                      <option value="finalizado">Finalizado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                    {atualizando === pedido.id && <span>Atualizando...</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PedidosAdmin;