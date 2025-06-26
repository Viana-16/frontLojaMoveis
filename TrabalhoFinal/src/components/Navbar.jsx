// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faMagnifyingGlass,
//   faUser,
//   faCartShopping,
// } from '@fortawesome/free-solid-svg-icons';
// import './Navbar.css';
// import { useSearch } from './Barra-Pesquisa/SearchContext'; // <-- IMPORTANTE

// const Navbar = () => {
//   const [itensCarrinho] = useState([]);
//   const totalItens = itensCarrinho.reduce((soma, item) => soma + item.qtd, 0);
//   const [hoverCarrinho, setHoverCarrinho] = useState(false);

//   const [inputBusca, setInputBusca] = useState('');
//   const { setTermoBusca } = useSearch(); // <-- CONTEXTO DE BUSCA
//   const navigate = useNavigate();

//   const mensagens = [
//     'Frete grátis nas compras acima de R$ 199!',
//     '10% de desconto no PIX!',
//     'Aproveite nossa liquidação por tempo limitado!',
//     'Compre em até 10x sem juros!',
//   ];

//   const [mensagemAtual, setMensagemAtual] = useState(0);

//   useEffect(() => {
//     const intervalo = setInterval(() => {
//       setMensagemAtual((prev) => (prev + 1) % mensagens.length);
//     }, 3000);
//     return () => clearInterval(intervalo);
//   }, []);

//   // 🔍 Função para buscar
//   const handleBuscar = (e) => {
//     e.preventDefault();
//     if (inputBusca.trim() !== '') {
//       setTermoBusca(inputBusca.toLowerCase());
//       navigate('/buscar');
//     }
//   };

//   return (
//     <>
//       <div className="mensagem-topo">
//         <div
//           className="mensagem-animada-container"
//           style={{ transform: `translateX(-${mensagemAtual * 100}%)` }}
//         >
//           {mensagens.map((msg, index) => (
//             <div className="mensagem-animada" key={index}>
//               {msg}
//             </div>
//           ))}
//         </div>
//       </div>

//       <nav className="navbar">
//         <div className="navbar-top">
//           <NavLink to="/" className="navbar-logo">
//             <img src="/img/logo2.png" alt="Logo" />
//           </NavLink>

//           {/* 🔍 Barra de pesquisa funcional */}
//           <form onSubmit={handleBuscar} className="barra-pesquisa-sophisticada">
//             <FontAwesomeIcon icon={faMagnifyingGlass} className="icone-pesquisa" />
//             <input
//               type="search"
//               className="input-pesquisa"
//               placeholder="O que você está procurando hoje? Busque pela categoria
//               "
//               aria-label="Buscar móveis"
//               value={inputBusca}
//               onChange={(e) => setInputBusca(e.target.value)}
//             />
//           </form>

//           <div className="navbar-right">
//             <NavLink
//               to="/carrinho"
//               className={({ isActive }) =>
//                 `link-carrinho-animado ${isActive ? 'ativo' : ''}`
//               }
//               onMouseEnter={() => setHoverCarrinho(true)}
//               onMouseLeave={() => setHoverCarrinho(false)}
//             >
//               <FontAwesomeIcon icon={faCartShopping} />
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

//             <NavLink
//               to="/conta"
//               className={({ isActive }) =>
//                 `link-conta ${isActive ? 'ativo-conta' : ''}`
//               }
//             >
//               <FontAwesomeIcon icon={faUser} /> Entre ou Cadastre-se
//             </NavLink>
//           </div>
//         </div>

//         {/* Links abaixo da busca */}
//         <div className="navbar-links-secundarios">
//           <NavLink to="/lancamentos">Lançamentos</NavLink>
//           <NavLink to="/atendimento">Atendimento</NavLink>
//           <NavLink to="/venda-corporativa">Venda Corporativa</NavLink>
//           <NavLink to="/cartao-presente">Cartão Presente</NavLink>
//           <NavLink to="/sala-de-estar">Sala de Estar</NavLink>
//           <NavLink to="/promocoes">Promoções</NavLink>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;




/* Navbar.jsx */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useUser } from './UserContext';           // ajuste caminho se necessário
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
