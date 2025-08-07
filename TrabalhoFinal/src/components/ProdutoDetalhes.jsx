// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./ProdutoDetalhes.css";

// export default function ProdutoDetalhes() {
//   const { id } = useParams();
//   const [produto, setProduto] = useState(null);
//   const [imagemIndex, setImagemIndex] = useState(0);

//   useEffect(() => {
//     fetch(`https://lojamoveis.onrender.com/api/Produto/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduto(data))
//       .catch((err) => console.error("Erro ao buscar produto:", err));
//   }, [id]);

//   if (!produto) return <div className="carregando">Carregando produto...</div>;

//   // Junta a imagem principal com as extras vindas da API (Cloudinary)
//   const imagens = [produto.imagemUrl, ...(produto.imagensExtras || [])];

//   const anterior = () => {
//     setImagemIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
//   };

//   const proximo = () => {
//     setImagemIndex((prev) => (prev + 1) % imagens.length);
//   };

//   return (
//     <div className="produto-detalhes-container">
//       <div className="galeria">
//         <button className="navegar-esquerda" onClick={anterior}>‹</button>
//         <img
//           src={imagens[imagemIndex]}
//           alt={produto.nome}
//           className="imagem-produto"
//         />
//         <button className="navegar-direita" onClick={proximo}>›</button>
//       </div>

//       <div className="informacoes">
//         <h1>{produto.nome}</h1>
//         <p className="descricao">{produto.descricao}</p>
//         <p className="preco">R$ {produto.preco.toFixed(2)}</p>

//         <div className="botoes">
//           <button className="comprar">
//             <i className="fas fa-credit-card"></i> Comprar
//           </button>
//           <button className="carrinho">
//             <i className="fas fa-shopping-cart"></i> Adicionar ao Carrinho
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProdutoDetalhes.css";
import { useNavigate, useLocation } from "react-router-dom";


export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(0);
  const [comentario, setComentario] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    fetch(`https://lojamoveis.onrender.com/api/Produto/${id}`)
      .then((res) => res.json())
      .then((data) => setProduto(data));
  }, [id]);

  if (!produto) return <div>Carregando...</div>;

  const imagens = produto.imagensExtras || [];

  const anterior = () => {
    setImagemIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  const proximo = () => {
    setImagemIndex((prev) => (prev + 1) % imagens.length);
  };

  const enviarAvaliacao = () => {
  const usuarioLogado = localStorage.getItem("usuarioLogado"); // ajuste se necessário

  if (!usuarioLogado) {
    // Salva a URL atual e vai para login
    localStorage.setItem("redirectAfterLogin", location.pathname);
    navigate("/conta");
    return;
  }

  if (!avaliacaoSelecionada || !comentario.trim()) {
    alert("Por favor, selecione uma nota e escreva um comentário.");
    return;
  }

  fetch(`https://lojamoveis.onrender.com/api/Produto/${id}/avaliar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}` // opcional
    },
    body: JSON.stringify({
      nota: avaliacaoSelecionada,
      comentario: comentario,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao enviar avaliação.");
      return res.json();
    })
    .then(() => {
      alert("Avaliação enviada com sucesso!");
      setAvaliacaoSelecionada(0);
      setComentario("");
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao enviar avaliação.");
    });
};


  return (
    <div className="produto-detalhes-container">
      <div className="galeria-bloco">
        <div className="miniaturas">
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
          <button className="seta seta-esquerda" onClick={anterior}>‹</button>
          <img
            src={imagens[imagemIndex]}
            alt={`Imagem ${imagemIndex + 1}`}
            className="imagem-produto"
          />
          <button className="seta seta-direita" onClick={proximo}>›</button>
        </div>
      </div>

      <div className="informacoes">
        <h1>{produto.nome}</h1>
        <p className="descricao">{produto.descricao}</p>

        <div className="avaliacao-media">
          {[1, 2, 3, 4, 5].map((estrela) => (
            <span
              key={estrela}
              className={`estrela ${estrela <= Math.round(produto.avaliacaoMedia || 0) ? "ativa" : ""}`}
            >
              ★
            </span>
          ))}
          <span className="texto-avaliacao">
            ({produto.qtdAvaliacoes || 0} avaliações)
          </span>
        </div>

        <p className="preco">R$ {produto.preco.toFixed(2)}</p>

        <div className="botoes">
          <button className="comprar">
            <i className="fas fa-credit-card"></i> Comprar
          </button>
          <button className="carrinho">
            <i className="fas fa-shopping-cart"></i> Adicionar ao Carrinho
          </button>
        </div>

        <div className="formulario-avaliacao">
          <h3>Avalie este produto</h3>
          <div className="estrelas-selecao">
            {[1, 2, 3, 4, 5].map((estrela) => (
              <span
                key={estrela}
                className={`estrela ${estrela <= avaliacaoSelecionada ? "ativa" : ""}`}
                onClick={() => setAvaliacaoSelecionada(estrela)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Escreva seu comentário..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
          <button className="enviar-avaliacao" onClick={enviarAvaliacao}>
            Enviar Avaliação
          </button>
        </div>

        <div className="comentarios-produto">
  <h3>Comentários dos usuários</h3>
  {produto.avaliacoes && produto.avaliacoes.length > 0 ? (
    produto.avaliacoes.map((avaliacao, index) => (
      <div key={index} className="comentario">
        <div className="estrelas-comentario">
          {[1, 2, 3, 4, 5].map((estrela) => (
            <span key={estrela} className={`estrela ${estrela <= avaliacao.nota ? "ativa" : ""}`}>★</span>
          ))}
        </div>
        <p className="texto-comentario">"{avaliacao.comentario}"</p>
      </div>
    ))
  ) : (
    <p className="sem-comentarios">Nenhum comentário ainda.</p>
  )}
</div>

      </div>
    </div>
  );
}

