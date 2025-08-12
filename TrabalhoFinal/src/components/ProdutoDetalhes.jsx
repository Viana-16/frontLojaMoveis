import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faChevronLeft, faChevronRight, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useCart } from "../components/CartContext";
import "./ProdutoDetalhes.css";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(0);
  const [comentario, setComentario] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cliente = JSON.parse(localStorage.getItem("cliente"));

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`https://lojamoveis.onrender.com/api/Produto/${id}`);
        const data = await response.json();
        setProduto(data);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch(`https://lojamoveis.onrender.com/api/Avaliacao/produto/${id}`);
        const data = await response.json();
        setAvaliacoes(data);
      } catch (err) {
        console.error("Erro ao carregar avaliações:", err);
      } finally {
        setLoadingAvaliacoes(false);
      }
    };

    fetchProduto();
    fetchAvaliacoes();
  }, [id]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando produto...</p>
    </div>
  );

  if (!produto) return <div className="error-message">Produto não encontrado</div>;

  // const imagens = produto.imagensExtras || [];
  const imagens = produto.imagensExtras 
  ? [...produto.imagensExtras].sort((a, b) => {
      // Ordena por nome ou por ordem numérica se tiver um padrão
      return a.localeCompare(b, undefined, { numeric: true });
    })
  : [];

  const jaAvaliou = cliente ? avaliacoes.some((a) => a.usuarioEmail === cliente.email) : false;

  // Função para formatar o preço como moeda brasileira
  const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  const handleAdicionarCarrinho = () => {
    if (!cliente) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      navigate("/conta");
      return;
    }

    const produtoComQuantidade = {
      ...produto,
      quantidade: quantidade
    };

    addToCart(produtoComQuantidade);
    alert(`"${produto.nome}" foi adicionado ao carrinho.`);
  };

  const enviarAvaliacao = async () => {
  try {
    // Validações
    if (!cliente) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      return navigate("/conta");
    }

    if (!avaliacaoSelecionada) {
      return alert("Por favor, selecione uma nota.");
    }

    if (!comentario.trim()) {
      return alert("Por favor, escreva um comentário.");
    }

    // Preparar dados no formato EXATO que a API espera
    const avaliacaoData = {
      id: "", // Deixe vazio para ser gerado pelo servidor
      idProduto: id, // Mantém como string conforme sua API
      clienteEmail: cliente.email,
      nota: parseInt(avaliacaoSelecionada),
      comentario: comentario.trim(),
      dataCriacao: new Date().toISOString()
    };

    console.log("Dados que serão enviados:", avaliacaoData);

    // Enviar requisição
    const response = await fetch(`https://lojamoveis.onrender.com/api/Avaliacao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
      },
      body: JSON.stringify(avaliacaoData)
    });

    // Tratar resposta
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Detalhes do erro da API:", errorData);
      
      // Mostra mensagens de validação específicas se existirem
      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors).flat().join("\n");
        throw new Error(errorMessages);
      }
      
      throw new Error(errorData.title || errorData.message || "Erro na requisição");
    }

    // Sucesso
    alert("Avaliação registrada com sucesso!");
    setComentario("");
    setAvaliacaoSelecionada(0);
    
    // Recarregar avaliações
    const novasAvaliacoes = await fetch(`https://lojamoveis.onrender.com/api/Avaliacao/produto/${id}`);
    setAvaliacoes(await novasAvaliacoes.json());

  } catch (error) {
    console.error("Erro completo:", error);
    alert(`Falha ao enviar avaliação: ${error.message}`);
  }
};

  // Calcula a média das avaliações
  const calcularMediaAvaliacoes = () => {
    if (avaliacoes.length === 0) return 0;
    const soma = avaliacoes.reduce((total, av) => total + av.nota, 0);
    return soma / avaliacoes.length;
  };

  const mediaAvaliacoes = calcularMediaAvaliacoes();

  return (    
    <div className="produto-detalhes-container">
      <div className="produto-content">
        {/* Galeria de Imagens */}
        <div className="galeria-bloco">

           <div className="miniaturas-container">
      {imagens.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Miniatura ${index + 1}`}
          className={`miniatura ${index === imagemIndex ? "ativa" : ""}`}
          onClick={() => setImagemIndex(index)}
        />
      ))}
    </div>
           <div className="imagem-principal-container">
      <button 
        className="seta seta-esquerda" 
        onClick={() => setImagemIndex((prev) => (prev - 1 + imagens.length) % imagens.length)}
        aria-label="Imagem anterior"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <img
        src={imagens[imagemIndex] || produto.imagemUrl}
        alt={produto.nome}
        className="imagem-produto"
      />
      <button 
        className="seta seta-direita" 
        onClick={() => setImagemIndex((prev) => (prev + 1) % imagens.length)}
        aria-label="Próxima imagem"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

     
    </div>
    </div>
          
          

        {/* Informações do Produto */}
        <div className="informacoes">
          <h1 className="produto-titulo">{produto.nome}</h1>
          
          <div className="estrelas-media">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <FontAwesomeIcon 
                  key={estrela}
                  icon={estrela <= Math.round(mediaAvaliacoes) ? faStarSolid : faStarRegular}
                  className={`estrela ${estrela <= Math.round(mediaAvaliacoes) ? "ativa" : ""}`}
                />
              ))}
            </div>

          <p className="preco">{formatarPreco(produto.preco)}</p>
          
          <p className="descricao">{produto.descricao}</p>
          
          <div className="quantidade-container">
            <label>Quantidade:</label>
            <div className="quantidade-control">
              <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
              <span>{quantidade}</span>
              <button onClick={() => setQuantidade(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="botoes">
            <button 
              className="btn-carrinho" 
              onClick={handleAdicionarCarrinho}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
      {/* Avaliações e Comentários */}
      <div className="avaliacoes-container">
        <h2>Avaliações do Produto</h2>
        
        <div className="resumo-avaliacoes">
          <div className="media-avaliacao">
            <span className="nota-media">{mediaAvaliacoes.toFixed(1)}</span>
            <div className="estrelas-media">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <FontAwesomeIcon 
                  key={estrela}
                  icon={estrela <= Math.round(mediaAvaliacoes) ? faStarSolid : faStarRegular}
                  className={`estrela ${estrela <= Math.round(mediaAvaliacoes) ? "ativa" : ""}`}
                />
              ))}
            </div>
            <span className="total-avaliacoes">({avaliacoes.length} avaliações)</span>
          </div>
        </div>

        {cliente && !jaAvaliou && (
          <div className="formulario-avaliacao">
            <h3>Deixe sua avaliação</h3>
            <div className="estrelas-selecao">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <FontAwesomeIcon 
                  key={estrela}
                  icon={estrela <= avaliacaoSelecionada ? faStarSolid : faStarRegular}
                  className={`estrela ${estrela <= avaliacaoSelecionada ? "ativa" : ""}`}
                  onClick={() => setAvaliacaoSelecionada(estrela)}
                />
              ))}
            </div>
            <textarea
              placeholder="Conte sua experiência com este produto..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <button className="btn-enviar-avaliacao" onClick={enviarAvaliacao}>
              Enviar Avaliação
            </button>
          </div>
        )}

        {cliente && jaAvaliou && (
          <p className="avaliacao-info">Você já avaliou este produto.</p>
        )}

        {!cliente && (
          <p className="avaliacao-info">
            <FontAwesomeIcon icon={faUser} /> Faça login para avaliar este produto.
          </p>
        )}

        {loadingAvaliacoes ? (
          <div className="loading-avaliacoes">Carregando avaliações...</div>
        ) : (
          <div className="comentarios-lista">
            {avaliacoes.length > 0 ? (
              avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="comentario-item">
                  <div className="comentario-header">
                    <div className="estrelas-comentario">
                      {[1, 2, 3, 4, 5].map((estrela) => (
                        <FontAwesomeIcon 
                          key={estrela}
                          icon={estrela <= avaliacao.nota ? faStarSolid : faStarRegular}
                          className={`estrela ${estrela <= avaliacao.nota ? "ativa" : ""}`}
                        />
                      ))}
                    </div>
                    <span className="comentario-usuario">{avaliacao.usuarioEmail}</span>
                    <span className="comentario-data">
                      {new Date(avaliacao.dataCriacao).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comentario-texto">"{avaliacao.comentario}"</p>
                </div>
              ))
            ) : (
              <p className="sem-comentarios">Este produto ainda não possui avaliações.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
