import React from "react";
import { useCart } from "../components/CartContext";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import "./ProdutoCard.css"; // se quiser estilizar separado

const ProdutoCard = ({ produto }) => {
  const { addToCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!user) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      navigate("/conta");
      return;
    }

    addToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl,
    });
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <div className="produto-card">
      <img
        src={
          produto.imagemUrl.startsWith("http")
            ? produto.imagemUrl
            : `https://localhost:7252/${produto.imagemUrl}`
        }
        alt={produto.nome}
        className="produto-img"
      />
      <h3>{produto.nome}</h3>
      <p>{produto.descricao}</p>
      <p><strong>R$ {produto.preco.toFixed(2)}</strong></p>
      <button onClick={handleAdd}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProdutoCard;
