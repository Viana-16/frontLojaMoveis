import React, { useState, useEffect, useRef } from 'react';
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

   const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  
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
    if (showSearchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchInput(false);
      setSearchTerm('');
    }
  };

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
            <NavLink to="/">Home</NavLink>
            <div className="dropdown">
              <button className="dropbtn">
                Categorias <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                <NavLink to="/guarda-roupas">Guarda-Roupa</NavLink>
                <NavLink to="/sala-de-estar">Sala de Estar</NavLink>
                <NavLink to="/sofas">Sofas</NavLink>
                <NavLink to="/cozinhas">Cozinha</NavLink>
                <NavLink to="/banheiro">Banheiro</NavLink>
                <NavLink to="/escritorio">Escritorios</NavLink>
                <NavLink to="/paineis">Paineis</NavLink>
                <NavLink to="/portaejanelas">Portas e Janelas</NavLink>
                <NavLink to="/camas">Camas</NavLink>
                <NavLink to="/lavanderia">Lavanderia</NavLink>
              </div>
            </div>
            <NavLink to="/lancamentos">Lançamentos</NavLink>
            <NavLink to="/promocoes">Promoções</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
          </div>

          {/* Ícones de ação */}
          <div className="nav-actions">
        <div className="search-container">
          {showSearchInput ? (
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar móveis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setShowSearchInput(false)} // fecha ao perder foco
              />
            </form>
          ) : (
            <Search 
              className="search-icon" 
              size={20} 
              style={{ cursor: 'pointer' }}
              onClick={() => setShowSearchInput(true)} 
            />
          )}
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

        {cliente.tipo === "admin" ? (
          <>
            <NavLink 
              to="/admin" 
              className="dropdown-item"
              onClick={() => setShowUserDropdown(false)}
            >
              Cadastrar Produtos
            </NavLink>

            <NavLink 
              to="/admin-painel" 
              className="dropdown-item"
              onClick={() => setShowUserDropdown(false)}
            >
              Editar Pedidos
            </NavLink>
          </>
        ) : (
          <>
            <NavLink 
              to="/meuperfil" 
              state={{ aba: 'dados'}}
              className="dropdown-item"
              onClick={() => setShowUserDropdown(false)}
            >
              Minha Conta
            </NavLink>
           
            <NavLink 
              to="/meuperfil" 
              state={{ aba: 'pedidos' }} 
              className="dropdown-item"
              onClick={() => setShowUserDropdown(false)}
            >
              Meus Pedidos  
            </NavLink>

          </>
        )}

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
              <NavLink to="/" onClick={() => setShowMobileMenu(false)}>Home</NavLink>
              <div className="dropdown">
              <button className="dropbtn">
                Categorias <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                <NavLink to="/guarda-roupas">Guarda-Roupa</NavLink>
                <NavLink to="/sala-de-estar">Sala de Estar</NavLink>
                <NavLink to="/sofas">Sofas</NavLink>
                <NavLink to="/cozinhas">Cozinha</NavLink>
                <NavLink to="/banheiro">Banheiro</NavLink>
                <NavLink to="/escritorio">Escritorios</NavLink>
                <NavLink to="/paineis">Paineis</NavLink>
                <NavLink to="/estantes">Estantes</NavLink>
                <NavLink to="/camas">Camas</NavLink>
                <NavLink to="/lavanderia">Lavanderia</NavLink>
              </div>
            </div>
              <NavLink to="/promocoes" onClick={() => setShowMobileMenu(false)}>Promoções</NavLink>
              <NavLink to="/sobre" onClick={() => setShowMobileMenu(false)}>Sobre Nós</NavLink>
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