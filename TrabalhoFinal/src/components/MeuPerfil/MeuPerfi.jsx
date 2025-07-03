// import React, { useState } from 'react';
// import { User, MapPin, ShoppingCart, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from './UserContext';
// import DadosUsuario from './MeuPerfil/DadosUsuario';
// import EnderecosUsuario from './MeuPerfil/EnderecosUsuario';
// import PedidosUsuario from './MeuPerfil/PedidosUsuario';
// import './MeuPerfil.css';

// const MeuPerfil = () => {
//   const { user, logout } = useUser();
//   const navigate = useNavigate();
//   const [abaAtiva, setAbaAtiva] = useState('dados');

//   const handleLogout = () => {
//     if (typeof logout === 'function') logout();
//     else localStorage.clear();
//     navigate('/conta');
//   };

//   return (
//     <div className="perfil-wrapper">
//       <aside className="sidebar">
//         <button className="btn-logout" onClick={handleLogout}>
//           <LogOut size={18} /> <span>Sair</span>
//         </button>

//         <div className="avatar"><User size={72} strokeWidth={1.4} /></div>
//         <p className="cliente-nome">{user?.nome || 'Cliente'}</p>

//         <nav className="menu-quadrados">
//           <button className={`square ${abaAtiva === 'dados' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('dados')}>
//             <User size={24} /> <span>Meus Dados</span>
//           </button>
//           <button className={`square ${abaAtiva === 'enderecos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('enderecos')}>
//             <MapPin size={24} /> <span>Endereço</span>
//           </button>
//           <button className={`square ${abaAtiva === 'pedidos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('pedidos')}>
//             <ShoppingCart size={24} /> <span>Meus Pedidos</span>
//           </button>
//         </nav>
//       </aside>

//       <section className="conteudo">
//         <h2>
//           {abaAtiva === 'dados' && 'Meus Dados'}
//           {abaAtiva === 'enderecos' && 'Endereços Cadastrados'}
//           {abaAtiva === 'pedidos' && 'Meus Pedidos'}
//         </h2>

//         {abaAtiva === 'dados' && <DadosUsuario />}
//         {abaAtiva === 'enderecos' && <EnderecosUsuario />}
//         {abaAtiva === 'pedidos' && <PedidosUsuario />}
//       </section>
//     </div>
//   );
// };

// export default MeuPerfil;

// MeuPerfil.jsx
import React, { useState } from 'react';
import { User, MapPin, ShoppingCart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MeuPerfil.css';
import { useUser } from '../UserContext';
import DadosUsuario from './DadosUsuario';
import EnderecosUsuario from './EnderecosUsuario';
import PedidosUsuario from './PedidosUsuario';

const MeuPerfil = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('dados');

  const handleLogout = () => {
    if (typeof logout === 'function') logout();
    else localStorage.clear();
    navigate('/conta');
  };

  return (
    <div className="perfil-wrapper">
      <aside className="sidebar">
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} /> <span>Sair</span>
        </button>
        <div className="avatar"><User size={72} strokeWidth={1.4} /></div>
        <p className="cliente-nome">{user?.nome || 'Cliente'}</p>
        <nav className="menu-quadrados">
          <button className={`square ${abaAtiva === 'dados' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('dados')}>
            <User size={24} /> <span>Meus Dados</span>
          </button>
          <button className={`square ${abaAtiva === 'enderecos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('enderecos')}>
            <MapPin size={24} /> <span>Endereço</span>
          </button>
          <button className={`square ${abaAtiva === 'pedidos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('pedidos')}>
            <ShoppingCart size={24} /> <span>Meus Pedidos</span>
          </button>
        </nav>
      </aside>

      <section className="conteudo">
        <h2>
          {abaAtiva === 'dados' && 'Meus Dados'}
          {abaAtiva === 'enderecos' && 'Endereços Cadastrados'}
          {abaAtiva === 'pedidos' && 'Meus Pedidos'}
        </h2>
        {abaAtiva === 'dados' && <DadosUsuario />}
        {abaAtiva === 'enderecos' && <EnderecosUsuario />}
        {abaAtiva === 'pedidos' && <PedidosUsuario />}
      </section>
    </div>
  );
};

export default MeuPerfil;