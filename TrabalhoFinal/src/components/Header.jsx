import { useState } from 'react';
import './Header.css';

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="header">
      <div className="logo">Minha Loja</div>

      <nav className={`nav ${menuAberto ? 'ativo' : ''}`}>
        <a href="/">Início</a>
        <a href="/produtos">Produtos</a>
        <a href="/atendimento">Atendimento</a>
        <a href="/contato">Contato</a>
      </nav>

      <div className="hamburguer" onClick={toggleMenu}>
        <span className="linha"></span>
        <span className="linha"></span>
        <span className="linha"></span>
      </div>
    </header>
  );
}

export default Header;
