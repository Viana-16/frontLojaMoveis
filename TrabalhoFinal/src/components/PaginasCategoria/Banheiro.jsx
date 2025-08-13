import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../components/UserContext";
import { useCart } from "../Carrinho/CartContext";
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
import "../../components/Home.css"; // Reaproveite os estilos do Home

// Componente Avaliação por Estrelas (mesmo do Home)
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

// Modal Confirmação (igual ao Home)
const CartModal = ({ show, produto, onClose }) => {
  if (!show || !produto) return null;

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

// Modal Login Necessário (igual ao Home)
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
          <button className="login-button" onClick={onLogin}>
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

// Função para formatar preços igual ao Home
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const Banheiro = () => {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [produtoAdicionado, setProdutoAdicionado] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useUser();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProdutosComAvaliacoes = async () => {
      try {
        const res = await fetch("https://lojamoveis.onrender.com/api/Produto");
        const data = await res.json();

        // Filtra 
        const produtosFiltrados = data.filter(p => p.categoria.toLowerCase() === "banheiro");

        // Busca avaliações para cada produto
        const produtosComAvaliacao = await Promise.all(
          produtosFiltrados.map(async (produto) => {
            try {
              const resAval = await fetch(`https://lojamoveis.onrender.com/api/Avaliacao/produto/${produto.id}`);
              const avaliacoes = await resAval.json();

              const media = avaliacoes.length > 0
                ? avaliacoes.reduce((total, av) => total + av.nota, 0) / avaliacoes.length
                : 0;

              return { ...produto, avaliacao: media };
            } catch (err) {
              console.error(`Erro ao buscar avaliações do produto ${produto.id}:`, err);
              return { ...produto, avaliacao: 0 };
            }
          })
        );

        setProdutos(produtosComAvaliacao);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProdutosComAvaliacoes();
  }, []);

  const handleCardClick = (produtoId) => {
    navigate(`/produto/${produtoId}`);
  };

  const handleAddToCart = (produto, e) => {
    e.stopPropagation();

    if (!user) {
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

  return (
    
    <div className="lancamentos-container">
       <h2 className="titulo-categorias">Banheiros</h2>
      

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

      <div className="lista-produtos">
        {produtos.map((produto) => (
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
    </div>
  );
};

export default Banheiro;
