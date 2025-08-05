// import React, { useState, useEffect } from 'react';
// import { User, MapPin, ShoppingCart, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './MeuPerfil.css';
// import { useUser } from '../UserContext';
// import DadosUsuario from './DadosUsuario';
// import EnderecosUsuario from './EnderecosUsuario';
// import PedidosUsuario from './PedidosUsuario';

// const MeuPerfil = () => {
//   const { user, setUser, logout } = useUser();
//   const navigate = useNavigate();
//   const [abaAtiva, setAbaAtiva] = useState('dados');
//   const [carregandoUsuario, setCarregandoUsuario] = useState(true);

//   // Busca os dados do cliente logado
//   useEffect(() => {
//     const fetchCliente = async () => {
//       if (!user?.email) {
//         setCarregandoUsuario(false);
//         return;
//       }
//       try {
//         const res = await fetch(`https://localhost:7252/api/Cliente/email/${user.email}`);
//         if (res.ok) {
//           const data = await res.json();
//           setUser(data); // Atualiza o UserContext com os dados completos
//         }
//       } catch (err) {
//         console.error('Erro ao buscar dados do cliente:', err);
//       } finally {
//         setCarregandoUsuario(false);
//       }
//     };
//     fetchCliente();
//   }, [user?.email, setUser]);

//   const handleLogout = () => {
//     if (typeof logout === 'function') logout();
//     else localStorage.clear();
//     navigate('/conta');
//   };

//   return (
//     <div className="perfil-container">
//       <div className="perfil-wrapper">
//         <aside className="sidebar-perfil">
//           <div className="perfil-header">
//             <div className="avatar-container">
//               <div className="avatar">
//                 <User size={72} strokeWidth={1.4} />
//               </div>
//               {carregandoUsuario ? (
//                 <h2 className="cliente-nome">Carregando...</h2>
//               ) : (
//                 <h2 className="cliente-nome">{user?.nome || 'Cliente'}</h2>
//               )}
//               <p className="cliente-email">{user?.email || ''}</p>
//             </div>
//           </div>

//           <nav className="menu-navegacao">
//             <button 
//               className={`nav-item ${abaAtiva === 'dados' ? 'ativo' : ''}`} 
//               onClick={() => setAbaAtiva('dados')}
//             >
//               <User size={20} className="nav-icon" />
//               <span>Meus Dados</span>
//             </button>
            
//             <button 
//               className={`nav-item ${abaAtiva === 'enderecos' ? 'ativo' : ''}`} 
//               onClick={() => setAbaAtiva('enderecos')}
//             >
//               <MapPin size={20} className="nav-icon" />
//               <span>Meus Endereços</span>
//             </button>
            
//             <button 
//               className={`nav-item ${abaAtiva === 'pedidos' ? 'ativo' : ''}`} 
//               onClick={() => setAbaAtiva('pedidos')}
//             >
//               <ShoppingCart size={20} className="nav-icon" />
//               <span>Meus Pedidos</span>
//             </button>
//           </nav>

//           <button className="btn-logout" onClick={handleLogout}>
//             <LogOut size={18} className="logout-icon" />
//             <span>Sair da Conta</span>
//           </button>
//         </aside>

//         <main className="conteudo-perfil">
//           <div className="cabecalho-conteudo">
//             <h2 className="titulo-secao">
//               {abaAtiva === 'dados' && 'Meus Dados Pessoais'}
//               {abaAtiva === 'enderecos' && 'Meus Endereços'}
//               {abaAtiva === 'pedidos' && 'Histórico de Pedidos'}
//             </h2>
//           </div>
          
//           <div className="conteudo-secao">
//             {abaAtiva === 'dados' && <DadosUsuario />}
//             {abaAtiva === 'enderecos' && <EnderecosUsuario />}
//             {abaAtiva === 'pedidos' && <PedidosUsuario />}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MeuPerfil;


import React, { useState, useEffect } from 'react';
import { User, MapPin, ShoppingCart, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ adicionamos useLocation
import './MeuPerfil.css';
import { useUser } from '../UserContext';
import DadosUsuario from './DadosUsuario';
import EnderecosUsuario from './EnderecosUsuario';
import PedidosUsuario from './PedidosUsuario';

const MeuPerfil = () => {
  const { user, setUser, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ capturando o estado da rota
  const abaRecebida = location.state?.aba || 'dados'; // ✅ pega a aba enviada ou 'dados'
  const [abaAtiva, setAbaAtiva] = useState(abaRecebida); // ✅ define o valor inicial da aba
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);

  // Atualiza aba se location.state mudar (caso o usuário clique novamente pela navbar)
  useEffect(() => {
    if (location.state?.aba && location.state.aba !== abaAtiva) {
      setAbaAtiva(location.state.aba);
    }
  }, [location.state?.aba]);

  // Busca os dados do cliente logado
  useEffect(() => {
    const fetchCliente = async () => {
      if (!user?.email) {
        setCarregandoUsuario(false);
        return;
      }
      try {
        const res = await fetch(`https://localhost:7252/api/Cliente/email/${user.email}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data); // Atualiza o UserContext com os dados completos
        }
      } catch (err) {
        console.error('Erro ao buscar dados do cliente:', err);
      } finally {
        setCarregandoUsuario(false);
      }
    };
    fetchCliente();
  }, [user?.email, setUser]);

  const handleLogout = () => {
    if (typeof logout === 'function') logout();
    else localStorage.clear();
    navigate('/conta');
  };

  return (
    <div className="perfil-container">
      <div className="perfil-wrapper">
        <aside className="sidebar-perfil">
          <div className="perfil-header">
            <div className="avatar-container">
              <div className="avatar">
                <User size={72} strokeWidth={1.4} />
              </div>
              {carregandoUsuario ? (
                <h2 className="cliente-nome">Carregando...</h2>
              ) : (
                <h2 className="cliente-nome">{user?.nome || 'Cliente'}</h2>
              )}
              <p className="cliente-email">{user?.email || ''}</p>
            </div>
          </div>

          <nav className="menu-navegacao">
            <button 
              className={`nav-item ${abaAtiva === 'dados' ? 'ativo' : ''}`} 
              onClick={() => setAbaAtiva('dados')}
            >
              <User size={20} className="nav-icon" />
              <span>Meus Dados</span>
            </button>
            
            <button 
              className={`nav-item ${abaAtiva === 'enderecos' ? 'ativo' : ''}`} 
              onClick={() => setAbaAtiva('enderecos')}
            >
              <MapPin size={20} className="nav-icon" />
              <span>Meus Endereços</span>
            </button>
            
            <button 
              className={`nav-item ${abaAtiva === 'pedidos' ? 'ativo' : ''}`} 
              onClick={() => setAbaAtiva('pedidos')}
            >
              <ShoppingCart size={20} className="nav-icon" />
              <span>Meus Pedidos</span>
            </button>
          </nav>

          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={18} className="logout-icon" />
            <span>Sair da Conta</span>
          </button>
        </aside>

        <main className="conteudo-perfil">
          <div className="cabecalho-conteudo">
            <h2 className="titulo-secao">
              {abaAtiva === 'dados' && 'Meus Dados Pessoais'}
              {abaAtiva === 'enderecos' && 'Meus Endereços'}
              {abaAtiva === 'pedidos' && 'Histórico de Pedidos'}
            </h2>
          </div>
          
          <div className="conteudo-secao">
            {abaAtiva === 'dados' && <DadosUsuario />}
            {abaAtiva === 'enderecos' && <EnderecosUsuario />}
            {abaAtiva === 'pedidos' && <PedidosUsuario />}
          </div>
        </main>
      </div>
    </div>
  );
};



export default MeuPerfil;

