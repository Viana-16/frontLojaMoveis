import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import "./PaginasCategoriaCSS/Lancamentos.css";
import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faStar as faStarSolid, 
  faCheckCircle,
  faExclamationCircle,
  faSignInAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

// Componente de Avaliação por Estrelas
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="avaliacao">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={`full-${i}`} icon={faStarSolid} style={{ color: "#f0cc00ff" }} />
      ))}
      {hasHalfStar && (
        <FontAwesomeIcon key="half" icon={faStarSolid} style={{ color: "#f0cc00ff" }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={`empty-${i}`} icon={faStarRegular} style={{ color: "#CCCCCC" }} />
      ))}
      <span>({rating.toFixed(1)})</span>
    </div>
  );
};


// Componente de Modal de Confirmação
const CartModal = ({ show, produto, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <h3>Produto adicionado ao carrinho!</h3>
        </div>
        <div className="modal-body">
          <img src={produto.imagemUrl} alt={produto.nome} className="modal-product-image" />
          <p>{produto.nome}</p>
          <p className="modal-product-price">R$ {produto.preco}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-continuar">Continuar Comprando</button>
          <Link to="/carrinho" className="btn-ir-carrinho">Ir para o Carrinho</Link>
        </div>
      </div>
    </div>
  );
};

// Componente de Modal de Login Necessário
const LoginRequiredModal = ({ show, onClose, onLogin }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="login-required-modal">
        <button className="close-modal" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </div>
        <h3>Atenção</h3>
        <p>Você precisa estar logado para adicionar itens ao carrinho.</p>
        <div className="modal-buttons">
          <button className="login-buttooon" onClick={onLogin}>
            <FontAwesomeIcon icon={faSignInAlt} /> Fazer Login
          </button>
          <button className="continue-button" onClick={onClose}>
            Continuar Navegando
          </button>
        </div>
      </div>
    </div>
  );
};



export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarSeta, setMostrarSeta] = useState(false);
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [produtoAdicionado, setProdutoAdicionado] = useState(null);
  const navigate = useNavigate();

  const cliente = JSON.parse(localStorage.getItem("cliente"));

  useEffect(() => {
    const fetchProdutosComAvaliacoes = async () => {
      try {
        const resProdutos = await fetch("https://lojamoveis.onrender.com/api/Produto");
        const produtosData = await resProdutos.json();

        const produtosComAvaliacao = await Promise.all(
          produtosData.map(async (produto) => {
            try {
              const resAval = await fetch(`https://lojamoveis.onrender.com/api/Avaliacao/produto/${produto.id}`);
              const avaliacoes = await resAval.json();

              let media = 0;
              if (avaliacoes.length > 0) {
                const soma = avaliacoes.reduce((total, av) => total + av.nota, 0);
                media = soma / avaliacoes.length;
              }

              return {
                ...produto,
                avaliacao: media
              };
            } catch (err) {
              console.error(`Erro ao buscar avaliações do produto ${produto.id}:`, err);
              return {
                ...produto,
                avaliacao: 0
              };
            }
          })
        );

        const produtosOrdenados = [...produtosComAvaliacao].sort((a, b) => a.id - b.id);
        setProdutos(produtosOrdenados);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProdutosComAvaliacoes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const alturaPagina = document.documentElement.scrollHeight;
      const alturaTela = window.innerHeight;
      setMostrarSeta(scrollTop + alturaTela >= alturaPagina * 0.55);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = (produtoId) => {
    navigate(`/produto/${produtoId}`);
  };

  const handleAddToCart = (produto, e) => {
    e.stopPropagation();
    
    if (!cliente) {
      setShowLoginModal(true);
      return;
    }

    addToCart(produto);
    setProdutoAdicionado(produto);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 5000);
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/conta");
  };

  // Função para formatar valores monetários
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

  return (
    <div className="home">
      {/* Modal de Confirmação */}
      <CartModal 
        show={showModal} 
        produto={produtoAdicionado} 
        onClose={() => setShowModal(false)} 
      />

      {/* Modal de Login Necessário */}
      <LoginRequiredModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginRedirect}
      />

      {/* Banner */}
      <section className="banner-container">
        <div className="banner">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            className="banner-swiper"
          >
            <SwiperSlide>
              <img src="/img/banner-home.jpg" alt="Banner 1" className="banner-image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Categorias */}
      <h2 className="titulo-categorias">Navegue por Categorias e Ambientes</h2>
      <section className="grid-categorias">
        {[
          { nome: "Guarda-Roupas", imagem: "/img/guardaroupa.avif", rota: "/guarda-roupas" },
          { nome: "Sala de Estar", imagem: "/img/saladeestar.avif", rota: "/sala-de-estar" },
          { nome: "Sofás", imagem: "/img/sofas.avif", rota: "/sofas" },
          { nome: "Cozinha", imagem: "/img/cozinha.avif", rota: "/cozinhas" },
          { nome: "Banheiro", imagem: "/img/banheiro.avif", rota: "/banheiro" },
          { nome: "Escritorio", imagem: "/img/escritorio.avif", rota: "/escritorio" },
          { nome: "Painéis", imagem: "/img/paineis.avif", rota: "/paineis" },
          { nome: "Portas-Janelas", imagem: "/img/portasejanelas.avif", rota: "/portaejanelas" },
          { nome: "Camas", imagem: "/img/cama.avif", rota: "/camas" },
          { nome: "Lavanderia", imagem: "/img/lavanderia.avif", rota: "/lavanderia" }
        ].map((cat, index) => (
          <Link
            key={index}
            to={cat.rota}
            className="card-categoria-grid"
            style={{ backgroundImage: `url(${cat.imagem})` }}
          >
            <span>{cat.nome}</span>
          </Link>
        ))}
      </section>

      {/* Primeira metade dos produtos */}
      <section className="produtos">
        <h2>Nossos Produtos</h2>
        <div className="lista-produtos">
          {produtos.slice(0, Math.ceil(produtos.length / 2)).map((produto) => (
            <div 
              className="produto-card" 
              key={produto.id}
              onClick={() => handleCardClick(produto.id)}
            >
              <div className="produto-card-header">
                <img 
                  src={produto.imagemUrl} 
                  alt={produto.nome} 
                  className="produto-imagem"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(produto.id);
                  }}
                />
                <button
                  className="icone-carrinho-topo"
                  onClick={(e) => handleAddToCart(produto, e)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
              <div className="produto-card-body">
                <div className="info-simples">
                  <h3>{produto.nome}</h3>
                  <div className="rating-price-container">
                    <StarRating rating={produto.avaliacao} />
                    <span className="preco">{formatarMoeda(produto.preco)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cards promocionais */}
      {/* <section className="cards-gigantes-lado-a-lado">
        {[
          { imagem: "/img/oferta.png"},
         
        ].map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className="card-gigante"
            style={{ backgroundImage: `url('${card.imagem}')` }}
          />
        ))}
      </section> */}

      {/* Segunda metade dos produtos */}
      <section className="produtos">
        <h2>Mais Produtos</h2>
        <div className="lista-produtos">
          {produtos.slice(Math.ceil(produtos.length / 2)).map((produto) => (
            <div 
              className="produto-card" 
              key={produto.id}
              onClick={() => handleCardClick(produto.id)}
            >
              <div className="produto-card-header">
                <img 
                  src={produto.imagemUrl} 
                  alt={produto.nome} 
                  className="produto-imagem"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(produto.id);
                  }}
                />
                <button
                  className="icone-carrinho-topo"
                  onClick={(e) => handleAddToCart(produto, e)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
              <div className="produto-card-body">
                <div className="info-simples">
                  <h3>{produto.nome}</h3>
                  <div className="rating-price-container">
                    <StarRating rating={produto.avaliacao} />
                    <span className="preco">{formatarMoeda(produto.preco)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Botão voltar ao topo */}
      {mostrarSeta && (
        <button
          className="voltar-topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </div>
  );
}
