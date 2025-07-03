/* Navbar.jsx */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useUser } from '../UserContext';           // ajuste caminho se necessário
import './Navbar.css';

const Navbar = () => {
  /* -------- carrinho (placeholder) -------- */
  const [itensCarrinho] = useState([]);            // integre ao contexto real depois
  const totalItens = itensCarrinho.reduce((soma, item) => soma + item.qtd, 0);
  const [hoverCarrinho, setHoverCarrinho] = useState(false);

  /* -------- usuário via contexto -------- */
  const { user: cliente } = useUser();             // re-renderiza a cada logout/login

  /* -------- mensagens do topo -------- */
  const mensagens = [
    'Frete grátis nas compras acima de R$ 199!',
    '10% de desconto no PIX!',
    'Liquidação por tempo limitado!',
    'Compre em até 10x sem juros!',
  ];
  const [mensagemAtual, setMensagemAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(
      () => setMensagemAtual((i) => (i + 1) % mensagens.length),
      3000
    );
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      {/* faixa promocional no topo */}
      <div className="mensagem-topo">
        <div
          className="mensagem-animada-container"
          style={{ transform: `translateX(-${mensagemAtual * 100}%)` }}
        >
          {mensagens.map((msg, i) => (
            <div className="mensagem-animada" key={i}>
              {msg}
            </div>
          ))}
        </div>
      </div>

      {/* NAVBAR PRINCIPAL */}
      <nav className="navbar">
        <div className="navbar-top">
          {/* logo */}
          <NavLink to="/" className="navbar-logo">
            <img src="/img/logo2.png" alt="Logo" />
          </NavLink>

          {/* barra de busca */}
          <div className="barra-pesquisa-sophisticada">
            <Search className="icone-pesquisa" size={18} />
            <input
              type="search"
              className="input-pesquisa"
              placeholder="O que você está procurando hoje?"
              aria-label="Buscar móveis"
            />
          </div>

          {/* área à direita: carrinho + conta */}
          <div className="navbar-right">
            {/* carrinho */}
            <NavLink
              to="/carrinho"
              className={({ isActive }) =>
                `link-carrinho-animado ${isActive ? 'ativo' : ''}`
              }
              onMouseEnter={() => setHoverCarrinho(true)}
              onMouseLeave={() => setHoverCarrinho(false)}
            >
              <ShoppingCart size={20} />
              <span className="carrinho-texto">Carrinho</span>
              {totalItens > 0 && <span className="badge vibrar">{totalItens}</span>}
            </NavLink>

            <div
              className={`tooltip-carrinho estilizado-tooltip ${
                hoverCarrinho ? 'visivel' : ''
              }`}
            >
              {totalItens === 0
                ? 'Carrinho vazio'
                : `${totalItens} item${totalItens > 1 ? 's' : ''} no carrinho`}
            </div>

            {/* -------- conta / login -------- */}
            {cliente ? (
              /* logado: mostra nome ou e-mail */
              <NavLink to="/meuperfil" className="link-conta logado">
                <User size={20} />
                <span className="nome-usuario">
                  Olá, {cliente.nome || cliente.email}
                </span>
              </NavLink>
            ) : (
              /* deslogado: entrar/cadastrar */
              <NavLink
                to="/conta"
                className={({ isActive }) =>
                  `link-conta ${isActive ? 'ativo-conta' : ''}`
                }
              >
                <User size={20} />
                <span>Entrar / Cadastrar</span>
              </NavLink>
            )}
          </div>
        </div>

        {/* links secundários */}
        <div className="navbar-links-secundarios">
          <NavLink to="/lancamentos">Lançamentos</NavLink>
          <NavLink to="/atendimento">Atendimento</NavLink>
          <NavLink to="/vendacorporativa">Venda Corporativa</NavLink>
          <NavLink to="/cartao-presente">Cartão Presente</NavLink>
          <NavLink to="/sala-de-estar">Sala de Estar</NavLink>
          <NavLink to="/promocoes">Promoções</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
