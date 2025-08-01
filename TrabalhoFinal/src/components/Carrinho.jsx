import React, { useState } from "react";
import { useUser } from '../components/UserContext';
import { useCart } from "../components/CartContext";
import { useNavigate, useLocation } from "react-router-dom"; // Adicionei useLocation aqui
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
    removeItemsFromCart // Adicionamos esta função no CartContext
  } = useCart();

  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);

  // Verifica se veio da confirmação de pagamento
  React.useEffect(() => {
    if (location.state?.fromPayment) {
      // Remove apenas os itens que foram para o pagamento
      if (location.state.purchasedItems) {
        removeItemsFromCart(location.state.purchasedItems);
      }
      // Limpa o state para não remover novamente
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, removeItemsFromCart]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Alterna seleção de item
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  // Calcula total dos itens selecionados
  const calculateSelectedTotal = () => {
    return cart.reduce((total, item) => {
      return selectedItems.includes(item.id) 
        ? total + (item.preco * item.quantidade) 
        : total;
    }, 0);
  };

  const selectedCount = selectedItems.length;

  const finalizarCompra = () => {
    if (selectedCount === 0 || !user?.email) return;

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
      status: "Pendente"
    };


    navigate("/pagamento", { 
      state: { 
        pedido,
        // Envia os IDs dos itens selecionados para poder remover depois
        selectedItems 
      } 
    });
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
                      src={item.imagemUrl.startsWith("http") ? item.imagemUrl : `https://localhost:7252/${item.imagemUrl}`}
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
              
              <button className="btn-secundario" onClick={clearCart}>
                <Trash2 size={16} /> Limpar Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;