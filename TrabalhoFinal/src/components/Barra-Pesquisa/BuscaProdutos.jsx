import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../components/UserContext';  // ajuste o caminho conforme seu projeto
import { useCart } from '../../components/CartContext';  // ajuste o caminho conforme seu projeto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faCheckCircle,
  faExclamationCircle,
  faSignInAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import '../../components/Home.css'; // Reaproveitando os estilos do Home/Lançamentos

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
          <p className="modal-product-price">R$ {produto.preco.toFixed(2)}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-continuar">Continuar Comprando</button>
          <Link to="/carrinho" className="btn-ir-carrinho">Ir para o Carrinho</Link>
        </div>
      </div>
    </div>
  );
};

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

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const BuscaProdutos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { addToCart } = useCart();

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [produtoAdicionado, setProdutoAdicionado] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const params = new URLSearchParams(location.search);
  const termoBusca = params.get('search') || '';

  useEffect(() => {
    if (!termoBusca.trim()) {
      setProdutos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErro(null);

    fetch(`https://lojamoveis.onrender.com/api/Produto/buscar?search=${encodeURIComponent(termoBusca)}`)
      .then(async res => {
        if (!res.ok) throw new Error('Erro na requisição');
        const data = await res.json();
        return data;
      })
      .then(data => {
        setProdutos(data);
      })
      .catch(err => {
        console.error(err);
        setErro('Erro ao buscar produtos. Tente novamente mais tarde.');
        setProdutos([]);
      })
      .finally(() => setLoading(false));
  }, [termoBusca]);

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
      <h2 className="titulo-categorias">Resultados para "{termoBusca}"</h2>

      {loading && <div className="spinner"></div>}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {!loading && produtos.length === 0 && !erro && (
        <p>Nenhum produto encontrado.</p>
      )}

      <CartModal 
        show={showModal} 
        produto={produtoAdicionado} 
        onClose={() => setShowModal(false)} 
      />

      <LoginRequiredModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginRedirect}
      />

      <div className="lista-produtos">
        {produtos.map(produto => (
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
                  <StarRating rating={produto.avaliacao || 0} />
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

export default BuscaProdutos;
