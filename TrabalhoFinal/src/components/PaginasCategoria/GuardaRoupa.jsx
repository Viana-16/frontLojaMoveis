// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../../components/UserContext";
// import { useCart } from "../../components/CartContext";
// import "../../components/PaginasCategoriaCSS/GuardaRoupa.css";

// const GuardaRoupa = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [carregando, setCarregando] = useState(true);
//   const navigate = useNavigate();
//   const { user } = useUser();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     setCarregando(true);
//     fetch("https://localhost:7252/api/Produto")
//       .then((res) => res.json())
//       .then((data) => {
//         const produtosFiltrados = data.filter(
//           (p) => p.categoria.toLowerCase() === "guarda-roupas"
//         );
//         setProdutos(produtosFiltrados);
//       })
//       .catch((err) => console.error("Erro ao buscar produtos:", err))
//       .finally(() => setCarregando(false));
//   }, []);

//   const handleAdicionarCarrinho = (produto) => {
//     if (!user) {
//       alert("Você precisa estar logado para adicionar ao carrinho.");
//       navigate("/conta");
//       return;
//     }
//     addToCart(produto);
//     alert(`"${produto.nome}" foi adicionado ao carrinho.`);
//   };

//   const formatarPreco = (preco) => {
//     return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//   };

//   if (carregando) {
//     return (
//       <div className="carregando-container">
//         <div className="carregando-spinner"></div>
//         <p>Carregando guarda-roupas...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="guarda-roupa-container">
//       <div className="categoria-header">
//         <h1>Guarda-Roupas Exclusivos</h1>
//         <p className="produtos-count">{produtos.length} produtos encontrados</p>
//       </div>

//       <div className="filtros-container">
//         <div className="filtro-tag">Entrega Rápida</div>
//         <div className="filtro-tag">Frete Grátis</div>
//         <div className="filtro-tag">Super Oferta</div>
//       </div>

//       <div className="produtos-grid">
//         {produtos.length > 0 ? (
//           produtos.map((produto) => (
//             <div className="produto-card" key={produto.id}>
//               <div className="imagem-container">
//                 <img
//                   src={produto.imagemUrl || "/img/placeholder-moveis.jpg"}
//                   alt={produto.nome}
//                   onError={(e) => {
//                     e.target.src = "/img/placeholder-moveis.jpg";
//                   }}
//                 />
//                 {produto.oferta && <div className="badge-oferta">OFERTA</div>}
//                 <div className="acoes-rapidas">
//                   <button className="btn-rapido favorito">♥</button>
//                   <button className="btn-rapido comparar">⇄</button>
//                 </div>
//               </div>

//               <div className="produto-info">
//                 <h3>{produto.nome}</h3>
                
//                 <div className="avaliacao">
//                   <span className="estrelas">★★★★★</span>
//                   <span className="nota">4.8</span>
//                   <span className="avaliacoes-count">(121)</span>
//                 </div>

//                 <div className="preco-container">
//                   <span className="preco">{formatarPreco(produto.preco)}</span>
//                   {produto.precoOriginal && (
//                     <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
//                   )}
//                   <span className="parcelamento">
//                     ou 10x de {formatarPreco(produto.preco / 10)} sem juros
//                   </span>
//                 </div>

//                 <div className="frete-info">
//                   <span className="frete-gratis">Frete Grátis</span>
//                   <span className="entrega-rapida">Entrega em 5 dias úteis</span>
//                 </div>

//                 <div className="botoes-card">
//                   <button
//                     className="btn-comprar"
//                     onClick={() => handleAdicionarCarrinho(produto)}
//                   >
//                     COMPRAR
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="sem-produtos">
//             <p>Nenhum guarda-roupa disponível no momento.</p>
//             <button onClick={() => navigate("/produtos")}>Ver outros móveis</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GuardaRoupa;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UserContext";
import { useCart } from "../../components/CartContext";
import "../../components/PaginasCategoriaCSS/GuardaRoupa.css";

const GuardaRoupa = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();
  const { addToCart } = useCart();

  useEffect(() => {
    setCarregando(true);
    fetch("https://localhost:7252/api/Produto")
      .then((res) => res.json())
      .then((data) => {
        const produtosFiltrados = data.filter(
          (p) => p.categoria.toLowerCase() === "guarda-roupas"
        );
        setProdutos(produtosFiltrados);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err))
      .finally(() => setCarregando(false));
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

  const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (carregando) {
    return (
      <div className="carregando-container">
        <div className="carregando-spinner"></div>
        <p>Carregando guarda-roupas...</p>
      </div>
    );
  }

  return (
    <div className="guarda-roupa-container">
      <div className="categoria-header">
        <h1>Guarda-Roupas Exclusivos</h1>
        <p className="produtos-count">{produtos.length} produtos encontrados</p>
      </div>

      <div className="filtros-container">
        <div className="filtro-tag">Entrega Rápida</div>
        <div className="filtro-tag">Frete Grátis</div>
        <div className="filtro-tag">Super Oferta</div>
      </div>

      <div className="produtos-grid">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div className="produto-card" key={produto.id}>
              <div className="imagem-container">
                <img
                  src={produto.imagemUrl || "/img/placeholder-moveis.jpg"}
                  alt={produto.nome}
                  onError={(e) => {
                    e.target.src = "/img/placeholder-moveis.jpg";
                  }}
                />
                {produto.oferta && <div className="badge-oferta">OFERTA</div>}
              </div>

              <div className="produto-info">
                <h3>{produto.nome}</h3>

                {/* ✅ Subtítulo novo */}
                <p className="subtitulo-produto">
                  {produto.descricao}
                </p>

                <div className="avaliacao">
                  <span className="estrelas">★★★★★</span>
                  <span className="nota">4.8</span>
                  <span className="avaliacoes-count">(121)</span>
                </div>

                <div className="preco-container">
                  <span className="preco">{formatarPreco(produto.preco)}</span>
                  {produto.precoOriginal && (
                    <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
                  )}
                  <span className="parcelamento">
                    ou 10x de {formatarPreco(produto.preco / 10)} sem juros
                  </span>
                </div>

                <div className="frete-info">
                  <span className="frete-gratis">Frete Grátis</span>
                  <span className="entrega-rapida">Entrega em 5 dias úteis</span>
                </div>

                <div className="botoes-card">
                  <button
                    className="btn-comprar"
                    onClick={() => handleAdicionarCarrinho(produto)}
                  >
                    COMPRAR
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="sem-produtos">
            <p>Nenhum guarda-roupa disponível no momento.</p>
            <button onClick={() => navigate("/produtos")}>Ver outros móveis</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardaRoupa;
