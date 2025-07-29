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
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu } from 'lucide-react';
import { Truck, CreditCard, Shield, Package } from 'lucide-react';
import { useUser } from '../UserContext';
import { useCart } from '../CartContext';
import './Navbar.css';

const Navbar = () => {
  const { itemCount } = useCart();
  const { user: cliente, logout } = useUser();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  
  const navigate = useNavigate();
   const [mensagemAtual, setMensagemAtual] = useState(0);

  // Mensagens promocionais
  const mensagens = [
    { texto: 'Frete grátis para todo Brasil', icone: <Truck size={18} /> },
    { texto: 'Parcele em até 10x sem juros', icone: <CreditCard size={18} /> },
    { texto: 'Compra 100% segura', icone: <Shield size={18} /> },
    { texto: 'Entrega rápida', icone: <Package size={18} /> }
  ];


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
    navigate('/conta'); // Redireciona para a página de login
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowUserDropdown(true);
  };

  const handleMouseLeaveDropdown = () => {
    const timeout = setTimeout(() => {
      setShowUserDropdown(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  return (
    <>
      {/* Faixa promocional superior */}
      {/* <div className="mensagem-topo">
        <div className="mensagem-container">
          {mensagens[mensagemAtual]}
        </div>
      </div> */}

      <div className="mensagem-topo">
      <div className="mensagem-container">
        <div className="mensagem-item">
          {mensagens[mensagemAtual].icone}
          <span>{mensagens[mensagemAtual].texto}</span>
        </div>
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
             <NavLink to="/lancamentos">Lançamentos</NavLink>
            <div className="dropdown">
              <button className="dropbtn">
                Categorias <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                <NavLink to="/moveis">Móveis</NavLink>
                <NavLink to="/decoracao">Decoração</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
              </div>
            </div>
            <NavLink to="/colecoes">Coleções</NavLink>
            <NavLink to="/promocoes">Promoções</NavLink>
            <NavLink to="/atendimento">Contato</NavLink>
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
            
            {cliente ? (
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
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/conta" className="login-text-btn">
                Entrar
              </NavLink>
            )}
            
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
              <div className="dropdown">
              <button className="dropbtn">
                Categorias <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                <NavLink to="/moveis">Móveis</NavLink>
                <NavLink to="/decoracao">Decoração</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
                <NavLink to="/iluminacao">Iluminação</NavLink>
              </div>
            </div>
              <NavLink to="/colecoes" onClick={() => setShowMobileMenu(false)}>Coleções</NavLink>
              <NavLink to="/promocoes" onClick={() => setShowMobileMenu(false)}>Promoções</NavLink>
              <NavLink to="/atendimento" onClick={() => setShowMobileMenu(false)}>Contato</NavLink>
              
              {/* Seção do usuário no mobile */}
              <div className="mobile-user-section">
                {cliente ? (
                  <>
                  </>
                ) : (
                  <>
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