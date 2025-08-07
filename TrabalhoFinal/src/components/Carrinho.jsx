import React, { useState } from "react";
import { useUser } from '../components/UserContext';
import { useCart } from "../components/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft, X, Check, ChevronDown, ChevronUp } from "lucide-react";
import "./Carrinho.css";

const Carrinho = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    increaseQuantity, 
    decreaseQuantity,
    cartTotal,
    itemCount,
    removeItemsFromCart
  } = useCart();

  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  React.useEffect(() => {
    if (location.state?.fromPayment) {
      if (location.state.purchasedItems) {
        removeItemsFromCart(location.state.purchasedItems);
      }
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, removeItemsFromCart]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const calculateSelectedTotal = () => {
    return cart.reduce((total, item) => {
      return selectedItems.includes(item.id) 
        ? total + (item.preco * item.quantidade) 
        : total;
    }, 0);
  };

  const selectedCount = selectedItems.length;

  const confirmClearCart = () => {
    setShowClearModal(true);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearModal(false);
    setSelectedItems([]);
  };

  const finalizarCompra = async () => {
  const enderecoAtivoId = localStorage.getItem('enderecoAtivo');

  if (!enderecoAtivoId) {
    setShowAddressModal(true);
    return;
  }

  try {
    // Busca o texto do endereço ativo pelo ID
    const res = await fetch(`https://lojamoveis.onrender.com/api/Endereco/id/${enderecoAtivoId.replace(/"/g, '')}`);
    if (!res.ok) throw new Error('Endereço não encontrado');
    
    const endereco = await res.json();
    const enderecoAtivoTexto = endereco.textoEndereco; // ✅ agora sim essa variável existe

    const pedido = {
      email: user.email,
      produtos: cart
        .filter(item => selectedItems.includes(item.id))
        .map(item => ({
          produtoId: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade
        })),
      total: calculateSelectedTotal(),
      dataPedido: new Date().toISOString(),
      textoEndereco: enderecoAtivoTexto, // ✅ envia junto com o pedido
      status: "pendente"
    };

    setShowCheckoutModal(true);

    setTimeout(() => {
      navigate("/pagamento", { 
        state: { 
          pedido,
          selectedItems 
        } 
      });
    }, 2000);

  } catch (err) {
    console.error('Erro ao buscar o endereço ativo:', err);
    alert('Erro ao buscar o endereço. Tente novamente.');
  }
};




  return (
    <div className="carrinho-container">
      <div className="carrinho-header">
        <button className="btn-voltar" onClick={() => navigate("/")}>
          <ArrowLeft size={20} /> Continuar comprando
        </button>
        <h2>
          <ShoppingBag size={24} /> Meu Carrinho
          {cart.length > 0 && (
            <span className="item-count">({itemCount()} {itemCount() === 1 ? 'item' : 'itens'})</span>
          )}
        </h2>
      </div>

      {cart.length === 0 ? (
        <div className="carrinho-vazio">
          <div className="icone-vazio">
            <ShoppingBag size={48} />
            <X size={48} className="x-icon" />
          </div>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione produtos para continuar</p>
          <button className="btn-primario" onClick={() => navigate("/")}>
            Ver produtos
          </button>
        </div>
      ) : (
        <div className="carrinho-content">
          <div className="carrinho-itens">
            {cart.map((item) => (
              <div className="carrinho-item" key={item.id}>
                <div className="item-seletor">
                  <button
                    className={`seletor-checkbox ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                    onClick={() => toggleItemSelection(item.id)}
                    aria-label={selectedItems.includes(item.id) ? 'Deselecionar item' : 'Selecionar item'}
                  >
                    {selectedItems.includes(item.id) && <Check size={16} />}
                  </button>
                </div>
                
                <div className="item-info">
                  <div className="item-imagem">
                    <img
                      src={item.imagemUrl.startsWith("http") ? item.imagemUrl : `https://lojamoveis.onrender.com/${item.imagemUrl}`}
                      alt={item.nome}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Produto+Sem+Imagem';
                      }}
                    />
                  </div>
                  <div className="item-detalhes">
                    <h3>{item.nome}</h3>
                    <p className="preco-unitario">{formatPrice(item.preco)}</p>
                    <button 
                      className="btn-remover" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} /> Remover
                    </button>
                  </div>
                </div>
                
                <div className="quantidade-controller">
                  <button 
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantidade <= 1}
                  >
                    <ChevronDown size={18} />
                  </button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => increaseQuantity(item.id)}>
                    <ChevronUp size={18} />
                  </button>
                </div>
                
                <div className="item-total">
                  <p>{formatPrice(item.preco * item.quantidade)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="carrinho-resumo">
            <div className="resumo-card">
              <h3>Resumo do Pedido</h3>
              
              <div className="resumo-linha">
                <span>Itens selecionados</span>
                <span>{selectedCount}</span>
              </div>
              
              <div className="resumo-linha">
                <span>Subtotal</span>
                <span>{formatPrice(calculateSelectedTotal())}</span>
              </div>
              
              <div className="resumo-linha">
                <span>Frete</span>
                <span className="frete-gratis">Grátis</span>
              </div>
              
              <div className="resumo-linha total">
                <span>Total</span>
                <span>{formatPrice(calculateSelectedTotal())}</span>
              </div>
              
              <button 
                className="btn-primario btn-finalizar" 
                onClick={finalizarCompra}
                disabled={selectedCount === 0}
              >
                Finalizar Compra ({selectedCount})
              </button>
              
              <button className="btn-secundario" onClick={confirmClearCart}>
                <Trash2 size={16} /> Limpar Carrinho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Limpar Carrinho */}
      {showClearModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Limpar Carrinho</h3>
              <button className="close-button" onClick={() => setShowClearModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja remover todos os itens do seu carrinho?</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secundario" onClick={() => setShowClearModal(false)}>
                Cancelar
              </button>
              <button className="btn-primario" onClick={handleClearCart}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Endereço Necessário */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Endereço Necessário</h3>
              <button className="close-button" onClick={() => setShowAddressModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Você precisa selecionar um endereço para continuar com o pagamento.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-primario" 
                onClick={() => {
                setShowAddressModal(false);
                navigate("/meuperfil", { state: { aba: 'enderecos' } });
                }}>
                Selecionar Endereço
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Compra */}
      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header success">
              <h3>Compra Confirmada!</h3>
            </div>
            <div className="modal-body">
              <div className="success-icon">✓</div>
              <p>Redirecionando para o pagamento...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;