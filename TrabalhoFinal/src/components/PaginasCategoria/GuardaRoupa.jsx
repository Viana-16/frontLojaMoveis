// import React, { useEffect, useState } from "react";

// const GuardaRoupa = () => {
//   const [produtos, setProdutos] = useState([]);

//   useEffect(() => {
//     fetch("https://localhost:7252/api/Produto")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Todos os produtos da API:", data);

//         const produtosFiltrados = data.filter(
//           (p) => p.categoria.toLowerCase() === "guarda-roupas"
//         );

//         console.log("Produtos filtrados pela categoria 'guarda-roupas':", produtosFiltrados);

//         setProdutos(produtosFiltrados);
//       })
//       .catch((err) => console.error("Erro ao buscar produtos:", err));
//   }, []);

//   return (
//     <div className="categoria-pagina">
//       <h2>Categoria: Guarda-Roupas</h2>
//       <div className="lista-produtos">
//         {produtos.map((produto) => (
//           <div className="produto-card" key={produto.id}>
//             <img
//               src={`https://localhost:7252/${produto.imagemUrl}`}
//               alt={produto.nome}
//             />
//             <h3>{produto.nome}</h3>
//             <p className="descricao">{produto.descricao}</p>
//             <p className="preco">R$ {produto.preco}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GuardaRoupa;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UserContext";
import { useCart } from "../../components/CartContext"; // Caminho correto

const GuardaRoupa = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser(); // pega o usuário logado
  const { addToCart } = useCart(); // função para adicionar ao carrinho

  useEffect(() => {
    fetch("https://localhost:7252/api/Produto")
      .then((res) => res.json())
      .then((data) => {
        const produtosFiltrados = data.filter(
          (p) => p.categoria.toLowerCase() === "guarda-roupas"
        );
        setProdutos(produtosFiltrados);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const handleAdicionarCarrinho = (produto) => {
    if (!user) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      navigate("/conta");
      return;
    }

    addToCart(produto);
    alert(`"${produto.nome}" foi adicionado ao carrinho.`);
  };

  return (
    <div className="categoria-pagina">
      <h2>Categoria: Guarda-Roupas</h2>
      <div className="lista-produtos">
        {produtos.map((produto) => (
          <div className="produto-card" key={produto.id}>
            <img
              src={produto.imagemUrl} // ✅ agora usa diretamente a URL completa
              alt={produto.nome}
            />
            <h3>{produto.nome}</h3>
            <p className="descricao">{produto.descricao}</p>
            <p className="preco">R$ {produto.preco}</p>
            <div className="botoes">
              <button
                className="carrinho"
                onClick={() => handleAdicionarCarrinho(produto)}
              >
                Adicionar ao Carrinho
              </button>
              <button
                className="informacoes"
                onClick={() => navigate(`/produto/${produto.id}`)}
              >
                Informações
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuardaRoupa;