import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProdutoDetalhes.css";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagemIndex, setImagemIndex] = useState(0);

  useEffect(() => {
    fetch(`https://localhost:7252/api/Produto/${id}`)
      .then((res) => res.json())
      .then((data) => setProduto(data))
      .catch((err) => console.error("Erro ao buscar produto:", err));
  }, [id]);

  if (!produto) return <div className="carregando">Carregando produto...</div>;

  // Junta a imagem principal com as extras vindas da API (Cloudinary)
  const imagens = [produto.imagemUrl, ...(produto.imagensExtras || [])];

  const anterior = () => {
    setImagemIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  const proximo = () => {
    setImagemIndex((prev) => (prev + 1) % imagens.length);
  };

  return (
    <div className="produto-detalhes-container">
      <div className="galeria">
        <button className="navegar-esquerda" onClick={anterior}>‹</button>
        <img
          src={imagens[imagemIndex]}
          alt={produto.nome}
          className="imagem-produto"
        />
        <button className="navegar-direita" onClick={proximo}>›</button>
      </div>

      <div className="informacoes">
        <h1>{produto.nome}</h1>
        <p className="descricao">{produto.descricao}</p>
        <p className="preco">R$ {produto.preco.toFixed(2)}</p>

        <div className="botoes">
          <button className="comprar">
            <i className="fas fa-credit-card"></i> Comprar
          </button>
          <button className="carrinho">
            <i className="fas fa-shopping-cart"></i> Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}




