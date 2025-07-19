// /* Navbar.jsx */
// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Search, ShoppingCart, User } from 'lucide-react';
// import { useUser } from '../UserContext';           // ajuste caminho se necessário
// import './Navbar.css';

// const Navbar = () => {
//   /* -------- carrinho (placeholder) -------- */
//   const [itensCarrinho] = useState([]);            // integre ao contexto real depois
//   const totalItens = itensCarrinho.reduce((soma, item) => soma + item.qtd, 0);
//   const [hoverCarrinho, setHoverCarrinho] = useState(false);

//   /* -------- usuário via contexto -------- */
//   const { user: cliente } = useUser();             // re-renderiza a cada logout/login

//   /* -------- mensagens do topo -------- */
//   const mensagens = [
//     'Frete grátis nas compras acima de R$ 199!',
//     '10% de desconto no PIX!',
//     'Liquidação por tempo limitado!',
//     'Compre em até 10x sem juros!',
//   ];
//   const [mensagemAtual, setMensagemAtual] = useState(0);

//   useEffect(() => {
//     const intervalo = setInterval(
//       () => setMensagemAtual((i) => (i + 1) % mensagens.length),
//       3000
//     );
//     return () => clearInterval(intervalo);
//   }, []);

//   return (
//     <>
//       {/* faixa promocional no topo */}
//       <div className="mensagem-topo">
//         <div
//           className="mensagem-animada-container"
//           style={{ transform: `translateX(-${mensagemAtual * 100}%)` }}
//         >
//           {mensagens.map((msg, i) => (
//             <div className="mensagem-animada" key={i}>
//               {msg}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* NAVBAR PRINCIPAL */}
//       <nav className="navbar">
//         <div className="navbar-top">
//           {/* logo */}
//           <NavLink to="/" className="navbar-logo">
//             <img src="/img/logo2.png" alt="Logo" />
//           </NavLink>

//           {/* barra de busca */}
//           <div className="barra-pesquisa-sophisticada">
//             <Search className="icone-pesquisa" size={18} />
//             <input
//               type="search"
//               className="input-pesquisa"
//               placeholder="O que você está procurando hoje?"
//               aria-label="Buscar móveis"
//             />
//           </div>

//           {/* área à direita: carrinho + conta */}
//           <div className="navbar-right">
//             {/* carrinho */}
//             <NavLink
//               to="/carrinho"
//               className={({ isActive }) =>
//                 `link-carrinho-animado ${isActive ? 'ativo' : ''}`
//               }
//               onMouseEnter={() => setHoverCarrinho(true)}
//               onMouseLeave={() => setHoverCarrinho(false)}
//             >
//               <ShoppingCart size={20} />
//               <span className="carrinho-texto">Carrinho</span>
//               {totalItens > 0 && <span className="badge vibrar">{totalItens}</span>}
//             </NavLink>

//             <div
//               className={`tooltip-carrinho estilizado-tooltip ${
//                 hoverCarrinho ? 'visivel' : ''
//               }`}
//             >
//               {totalItens === 0
//                 ? 'Carrinho vazio'
//                 : `${totalItens} item${totalItens > 1 ? 's' : ''} no carrinho`}
//             </div>

//             {/* -------- conta / login -------- */}
//             {cliente ? (
//               /* logado: mostra nome ou e-mail */
//               <NavLink to="/meuperfil" className="link-conta logado">
//                 <User size={20} />
//                 <span className="nome-usuario">
//                   Olá, {cliente.nome || cliente.email}
//                 </span>
//               </NavLink>
//             ) : (
//               /* deslogado: entrar/cadastrar */
//               <NavLink
//                 to="/conta"
//                 className={({ isActive }) =>
//                   `link-conta ${isActive ? 'ativo-conta' : ''}`
//                 }
//               >
//                 <User size={20} />
//                 <span>Entrar / Cadastrar</span>
//               </NavLink>
//             )}
//           </div>
//         </div>

//         {/* links secundários */}
//         <div className="navbar-links-secundarios">
//           <NavLink to="/lancamentos">Lançamentos</NavLink>
//           <NavLink to="/atendimento">Atendimento</NavLink>
//           <NavLink to="/vendacorporativa">Venda Corporativa</NavLink>
//           <NavLink to="/cartao-presente">Cartão Presente</NavLink>
//           <NavLink to="/sala-de-estar">Sala de Estar</NavLink>
//           <NavLink to="/promocoes">Promoções</NavLink>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu } from 'lucide-react';
import { useUser } from '../UserContext';
import { useCart } from '../CartContext';
import './Navbar.css';

const Navbar = () => {
  const { itemCount } = useCart();
  const { user: cliente, logout } = useUser();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
   const [dropdownTimeout, setDropdownTimeout] = useState(null);

  // Mensagens promocionais
  const mensagens = [
    '🚚 Frete grátis para todo Brasil',
    '💳 Parcele em até 10x sem juros',
    '🔒 Compra 100% segura',
    '📦 Entrega rápida'
  ];
  const [mensagemAtual, setMensagemAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(
      () => setMensagemAtual((i) => (i + 1) % mensagens.length),
      4000
    );
    return () => clearInterval(intervalo);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const handleMouseEnterDropdown = () => {
    // Cancela qualquer timeout pendente
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowUserDropdown(true);
  };

  const handleMouseLeaveDropdown = () => {
    // Configura um timeout para fechar o dropdown
    const timeout = setTimeout(() => {
      setShowUserDropdown(false);
    }, 300); // 300ms de delay
    setDropdownTimeout(timeout);
  };

  return (
    <>
      {/* Faixa promocional superior */}
      <div className="mensagem-topo">
        <div className="mensagem-container">
          {mensagens[mensagemAtual]}
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="navbar-classica">
        <div className="navbar-container">
          {/* Logo centralizado */}
          <div className="logo-container">
            <NavLink to="/" className="navbar-logo">
              <img src="/img/logo2.png" alt="Logo" />
            </NavLink>
          </div>

          {/* Menu desktop */}
          <div className="nav-links desktop-only">
            <NavLink to="/sobre">Sobre Nós</NavLink>
            <div className="dropdown">
              <button className="dropbtn">
                Produtos <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                <NavLink to="/moveis">Móveis</NavLink>
                <NavLink to="/decoracao">Decoração</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
              </div>
            </div>
            <NavLink to="/colecoes">Coleções</NavLink>
            <NavLink to="/promocoes">Promoções</NavLink>
            <NavLink to="/contato">Contato</NavLink>
          </div>

          {/* Ícones de ação */}
          <div className="nav-actions">
            <div className="search-container">
              <Search className="search-icon" size={20} />
            </div>
            
            <NavLink to="/carrinho" className="cart-icon">
              <ShoppingCart size={20} />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </NavLink>
            
            <div 
        className="user-container"
        onMouseEnter={handleMouseEnterDropdown}
        onMouseLeave={handleMouseLeaveDropdown}
      >
        <button 
          className="user-icon-btn"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
        >
          <User size={20} />
        </button>
        
        {showUserDropdown && (
          <div 
            className="user-dropdown"
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
          >
                  {cliente ? (
                    <>
                      <div className="user-info">
                        <p className="user-greeting">Olá, {cliente.nome || cliente.email}</p>
                        {cliente.email && <p className="user-email">{cliente.email}</p>}
                      </div>
                      <div className="dropdown-divider"></div>
                      <NavLink 
                        to="/meuperfil" 
                        className="dropdown-item"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Minha Conta
                      </NavLink>
                      <NavLink 
                        to="/meuspedidos" 
                        className="dropdown-item"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Meus Pedidos
                      </NavLink>
                      <button 
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink 
                        to="/login" 
                        className="dropdown-item"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Entrar
                      </NavLink>
                      <NavLink 
                        to="/cadastro" 
                        className="dropdown-item"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Cadastrar
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <button 
              className="mobile-menu-btn" 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {showMobileMenu && (
          <div className="mobile-menu">
            <div className="mobile-links">
              <NavLink to="/sobre" onClick={() => setShowMobileMenu(false)}>Sobre Nós</NavLink>
              <NavLink to="/moveis" onClick={() => setShowMobileMenu(false)}>Móveis</NavLink>
              <NavLink to="/decoracao" onClick={() => setShowMobileMenu(false)}>Decoração</NavLink>
              <NavLink to="/iluminacao" onClick={() => setShowMobileMenu(false)}>Iluminação</NavLink>
              <NavLink to="/colecoes" onClick={() => setShowMobileMenu(false)}>Coleções</NavLink>
              <NavLink to="/promocoes" onClick={() => setShowMobileMenu(false)}>Promoções</NavLink>
              <NavLink to="/contato" onClick={() => setShowMobileMenu(false)}>Contato</NavLink>
              
              {/* Seção do usuário no mobile */}
              <div className="mobile-user-section">
                {cliente ? (
                  <>
                    <div className="mobile-user-info">
                      <p className="mobile-user-greeting">Olá, {cliente.nome || cliente.email}</p>
                      {cliente.email && <p className="mobile-user-email">{cliente.email}</p>}
                    </div>
                    <NavLink to="/minhaconta" onClick={() => setShowMobileMenu(false)}>Minha Conta</NavLink>
                    <NavLink to="/meuspedidos" onClick={() => setShowMobileMenu(false)}>Meus Pedidos</NavLink>
                    <button className="mobile-logout-btn" onClick={handleLogout}>Sair</button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={() => setShowMobileMenu(false)}>Entrar</NavLink>
                    <NavLink to="/cadastro" onClick={() => setShowMobileMenu(false)}>Cadastrar</NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;