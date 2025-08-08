import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { useCart } from "../components/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar as faStarSolid, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [produtosAleatorios, setProdutosAleatorios] = useState([]);
  const [mostrarSeta, setMostrarSeta] = useState(false);
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [produtoAdicionado, setProdutoAdicionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://lojamoveis.onrender.com/api/Produto")
      .then((res) => res.json())
      .then((data) => {
        const produtosComAvaliacao = data.map(produto => ({
          ...produto,
          avaliacao: produto.avaliacao || (3 + Math.random() * 2).toFixed(1)
        }));
        setProdutos(produtosComAvaliacao);
        const embaralhado = [...produtosComAvaliacao].sort(() => Math.random() - 0.5);
        setProdutosAleatorios(embaralhado);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
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
    addToCart(produto);
    setProdutoAdicionado(produto);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 5000); // Fecha automaticamente após 5 segundos
  };

  return (
    <div className="home">
      {/* Modal de Confirmação */}
      <CartModal 
        show={showModal} 
        produto={produtoAdicionado} 
        onClose={() => setShowModal(false)} 
      />

      {/* BANNER PRINCIPAL */}
      <section className="banner">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          className="banner-swiper"
        >
          <SwiperSlide><img src="/img/BannerHome1.png" alt="Banner 1" /></SwiperSlide>
          <SwiperSlide><img src="/img/BannerHome2.png" alt="Banner 2" /></SwiperSlide>
          <SwiperSlide><img src="/img/BannerHome3.png" alt="Banner 3" /></SwiperSlide>
        </Swiper>
      </section>

      {/* CATEGORIAS */}
      <h2 className="titulo-categorias">Navegue por Categorias e Ambientes</h2>
      <section className="grid-categorias">
        {[
          { nome: "Guarda-Roupas", imagem: "/img/guardaroupa.avif", rota: "/guarda-roupas" },
          { nome: "Sala de Estar", imagem: "/img/saladeestar.avif", rota: "/sala-de-estar" },
          { nome: "Sofás", imagem: "/img/sofas.avif", rota: "/sofas" },
          { nome: "Cozinha", imagem: "/img/cozinha.avif", rota: "/cozinha" },
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

      {/* PRODUTOS - PRIMEIRA SEÇÃO */}
      <section className="produtos">
        <h2>Veja Nossos Produtos</h2>
        <div className="lista-produtos">
          {produtosAleatorios.slice(0, 8).map((produto) => (
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
                <div className="produto-overlay">
                
                </div>
              </div>
              <div className="produto-card-body">
                <div className="info-simples">
                  <h3>{produto.nome}</h3>
                  <div className="rating-price-container">
                    <StarRating rating={parseFloat(produto.avaliacao)} />
                    <span className="preco">R$ {produto.preco}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARDS PROMOCIONAIS GIGANTES */}
      <section className="cards-gigantes-lado-a-lado">
        {[
          { imagem: "/img/MoveisMcategoria.png", link: "/sobre" },
          { imagem: "/img/MoveisMcategoria.png", link: "/produtos" },
          { imagem: "/img/MoveisMcategoria.png", link: "/atendimento" }
        ].map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className="card-gigante"
            style={{ backgroundImage: `url('${card.imagem}')` }}
          >
            <div className="overlay"></div>
            <div className="conteudo-card">
              <h2>{card.titulo}</h2>
              <p>{card.texto}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* PRODUTOS - PRIMEIRA SEÇÃO */}
      <section className="produtos">
        <h2>Veja Nossos Produtos</h2>
        <div className="lista-produtos">
          {produtosAleatorios.slice(0, 8).map((produto) => (
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
                <div className="produto-overlay">
                  
                </div>
              </div>
              <div className="produto-card-body">
                <div className="info-simples">
                  <h3>{produto.nome}</h3>
                  <div className="rating-price-container">
                    <StarRating rating={parseFloat(produto.avaliacao)} />
                    <span className="preco">R$ {produto.preco}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUTOS - PRIMEIRA SEÇÃO */}
      <section className="produtos">
        <h2>Veja Nossos Produtos</h2>
        <div className="lista-produtos">
          {produtosAleatorios.slice(0, 8).map((produto) => (
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
                <div className="produto-overlay">
                  
                </div>
              </div>
              <div className="produto-card-body">
                <div className="info-simples">
                  <h3>{produto.nome}</h3>
                  <div className="rating-price-container">
                    <StarRating rating={parseFloat(produto.avaliacao)} />
                    <span className="preco">R$ {produto.preco}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARD GIGANTE FINAL */}
      <section className="card-final-destaque" style={{ backgroundImage: "url('/img/BannerGigante.webp')" }}>
        <div className="overlay"></div>
      </section>

      {/* BOTÃO VOLTAR AO TOPO */}
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