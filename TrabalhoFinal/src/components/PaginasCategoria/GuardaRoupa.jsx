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
//               </div>

//               <div className="produto-info">
//                 <h3>{produto.nome}</h3>

//                 {/* ✅ Subtítulo novo */}
//                 <p className="subtitulo-produto">
//                   {produto.descricao}
//                 </p>

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
//             <button onClick={() => navigate("/")}>Ver outros móveis</button>
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

  // Função para gerar avaliações aleatórias realistas
  const gerarAvaliacao = () => {
    const notas = [4.2, 4.5, 4.7, 4.8, 4.9, 5.0];
    const avaliacoesCount = [15, 28, 42, 56, 73, 89, 104, 121];
    const randomIndex = Math.floor(Math.random() * notas.length);
    
    return {
      nota: notas[randomIndex],
      count: avaliacoesCount[Math.floor(Math.random() * avaliacoesCount.length)]
    };
  };

  useEffect(() => {
    setCarregando(true);
    fetch("https://localhost:7252/api/Produto")
      .then((res) => res.json())
      .then((data) => {
        const produtosFiltrados = data.filter(
          (p) => p.categoria.toLowerCase() === "guarda-roupas"
        ).map(produto => ({
          ...produto,
          avaliacao: gerarAvaliacao() // Adiciona avaliação única para cada produto
        }));
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

  // Função para renderizar estrelas baseadas na nota
  const renderEstrelas = (nota) => {
    const estrelasCheias = Math.floor(nota);
    const temMeiaEstrela = nota % 1 >= 0.5;
    const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0);
    
    return (
      <>
        {[...Array(estrelasCheias)].map((_, i) => (
          <span key={`cheia-${i}`} className="estrela-cheia">★</span>
        ))}
        {temMeiaEstrela && <span className="estrela-meia">★</span>}
        {[...Array(estrelasVazias)].map((_, i) => (
          <span key={`vazia-${i}`} className="estrela-vazia">★</span>
        ))}
      </>
    );
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
                <h3 className="titulo-produto">
                  {produto.nome}
                </h3>

                <p className="subtitulo-produto">
                  {produto.descricao.substring(0, 60)}...
                </p>

                <div className="avaliacao">
                  <div className="estrelas">
                    {renderEstrelas(produto.avaliacao.nota)}
                  </div>
                  <span className="nota">{produto.avaliacao.nota.toFixed(1)}</span>
                  <span className="avaliacoes-count">({produto.avaliacao.count})</span>
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
            <button onClick={() => navigate("/")}>Ver outros móveis</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardaRoupa;