// import React, { useEffect, useState } from "react";
// import "./Home.css";

// const categorias = [
//   { nome: "Todos", imagem: "/img/categorias/todos.jpg" },
//   { nome: "Quarto", imagem: "/img/quarto.png" },
//   { nome: "Cozinha", imagem: "/img/categorias/mesa.jpg" },
//   { nome: "Sala-Estar", imagem: "/img/categorias/sofa.jpg" },
//   { nome: "Sala-Jantar", imagem: "/img/categorias/sofa.jpg" },
//   { nome: "Lavanderia", imagem: "/img/categorias/sofa.jpg" }
// ];

// export default function Home() {
//   const [produtos, setProdutos] = useState([]);
//   const [filtro, setFiltro] = useState("Todos");
//   const [mostrarSeta, setMostrarSeta] = useState(false);

//   useEffect(() => {
//     fetch("https://localhost:7252/api/Produto")
//       .then((res) => res.json())
//       .then((data) => setProdutos(data))
//       .catch((err) => console.error("Erro ao buscar produtos:", err));
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const alturaPagina = document.documentElement.scrollHeight;
//       const alturaTela = window.innerHeight;

//       if (scrollTop + alturaTela >= alturaPagina * 0.55) {
//         setMostrarSeta(true);
//       } else {
//         setMostrarSeta(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const filtrarProdutos =
//     filtro === "Todos"
//       ? produtos
//       : produtos.filter((p) => p.categoria === filtro);

//   return (
//     <div className="home">
//       {/* Banner */}
//       <section className="banner">
//         <img
//           className="banner-img"
//           src="/img/bannerPR.png"
//           alt="Banner de móveis"
//         />
//       </section>

//       {/* Filtros de categoria */}
//       <section className="filtro-categorias">
//         {categorias.map((cat) => (
//           <div
//             key={cat.nome}
//             className={`categoria-circulo ${filtro === cat.nome ? "ativo" : ""}`}
//             onClick={() => setFiltro(cat.nome)}
//             style={{ backgroundImage: `url(${cat.imagem})` }}
//           >
//             <span>{cat.nome}</span>
//           </div>
//         ))}
//       </section>
      

//       {/* Lista de produtos */}
// <section className="produtos">
//   <div className="lista-produtos">
//     {filtrarProdutos.map((produto) => (
//       <div className="produto-card" key={produto.id}>
//         <img
//           src={`https://localhost:7252/${produto.imagemUrl}`}
//           alt={produto.nome}
//           className="card-image"
//         />
//         <h3 className="card-title">{produto.nome}</h3>
//         <p className="card-description">{produto.descricao}</p>
//         <p className="card-price">R$ {produto.preco}</p>
//         <p className="card-category">Categoria: {produto.categoria}</p>
//         <div className="botoes">
//           <button className="carrinho">Adicionar ao carrinho</button>
//           <button className="comprar">Comprar</button>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>

//       {/* Botão de voltar ao topo */}
//       {mostrarSeta && (
//         <button
//           className="voltar-topo"
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         >
//           ↑
//         </button>
//       )}
//     </div>
//   );
// }


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Home.css";

const categorias = [
  { nome: "Todos", imagem: "/img/categorias/todos.jpg" },
  { nome: "Quarto", imagem: "/img/quarto.png" },
  { nome: "Cozinha", imagem: "/img/categorias/mesa.jpg" },
  { nome: "Sala-Estar", imagem: "/img/categorias/sofa.jpg" },
  { nome: "Sala-Jantar", imagem: "/img/categorias/sofa.jpg" },
  { nome: "Lavanderia", imagem: "/img/categorias/sofa.jpg" }
];

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  // const [filtro, setFiltro] = useState("Todos");
  const [mostrarSeta, setMostrarSeta] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoComentario, setNovoComentario] = useState("");
  const [novaEstrela, setNovaEstrela] = useState(5);

  // ✅ Correto: fora do useEffect
  const handleNovaAvaliacao = (e) => {
    e.preventDefault();
    const nova = {
      nome: novoNome,
      comentario: novoComentario,
      estrelas: novaEstrela
    };
    setAvaliacoes([nova, ...avaliacoes]);
    setNovoNome("");
    setNovoComentario("");
    setNovaEstrela(5);
  };

  useEffect(() => {
    fetch("https://localhost:7252/api/Produto")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const alturaPagina = document.documentElement.scrollHeight;
      const alturaTela = window.innerHeight;

      setMostrarSeta(scrollTop + alturaTela >= alturaPagina * 0.55);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const filtrarProdutos =
  //   filtro === "Todos"
  //     ? produtos
  //     : produtos.filter((p) => p.categoria === filtro);

  const filtrarProdutos = produtos.filter(p => p.categoria === "Lançamentos");


  return (
    <div className="home">
      {/* Banner */}
      <section className="banner">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          effect="fade"
          loop={true}
          className="banner-swiper"
        >
          <SwiperSlide>
            <img src="/img/bannerPR.png" alt="Banner 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/bannerPR.png" alt="Banner 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/bannerPR.png" alt="Banner 3" />
          </SwiperSlide>
        </Swiper>
      </section>

      <h2 className="titulo-categorias">Navegue por Categorias e Ambientes</h2>

      {/* Categorias em grade */}
      <section className="grid-categorias">
        {[
          { nome: "Guarda-Roupas", imagem: "/img/guardaroupas.avif", rota: "/guarda-roupas" },
          { nome: "Sala de Estar", imagem: "/img/saladeestar.avif", rota: "/sala-de-estar" },
          { nome: "Sofás", imagem: "/img/sofas.avif", rota: "/sofas" },
          { nome: "Cozinha", imagem: "/img/cozinha.avif", rota: "/cozinha" },
          { nome: "Banheiro", imagem: "/img/banheiro.avif", rota: "/banheiro" },
          { nome: "Escritorio", imagem: "/img/mesas.webp", rota: "/escritorio" },
          { nome: "Painéis", imagem: "/img/paineis.webp", rota: "/paineis" },
          { nome: "Estantes", imagem: "/img/estantes.webp", rota: "/estantes" },
          { nome: "Camas", imagem: "/img/camas.webp", rota: "/camas" },
          { nome: "Lavanderia", imagem: "/img/lavanderia.webp", rota: "/lavanderia" }
        ].map((cat, index) => (
          <Link
            key={index}
            to={cat.rota}
            className="card-categoria-grid"
            style={{ backgroundImage: `url(${cat.imagem})` }}
          >
            <span>{cat.nome}</span>
          </Link>
        ))}
      </section>

      {/* Todos os Produtos em Ordem Aleatória */}
<section className="produtos">
  <h2>Veja Nossos Produtos</h2>
  <div className="lista-produtos">
    {[...produtos].sort(() => Math.random() - 0.5).map((produto) => (
      <div className="produto-card" key={produto.id}>
        <img src={produto.imagemUrl} alt={produto.nome} />
        <h3>{produto.nome}</h3>
        <p className="descricao">{produto.descricao}</p>
        <p className="preco">R$ {produto.preco}</p>
        <p className="categoria">Categoria: {produto.categoria}</p>
        <div className="botoes">
          <button className="carrinho">Adicionar ao carrinho</button>
          <button
            className="informacoes"
            onClick={() => window.location.href = `/produto/${produto.id}`}
          >
            Informações
          </button>
        </div>
      </div>
    ))}
  </div>
</section>



      {/* Cards grandes */}
      <section className="cards-gigantes-lado-a-lado">
        {[
          {
            imagem: "/img/card1.avif",
            titulo: "Móveis Planejados sob Medida",
            texto: "Estilo, organização e funcionalidade para transformar seu lar.",
            botao: "Descubra Mais",
            link: "/sobre"
          },
          {
            imagem: "/img/card2.avif",
            titulo: "Conforto e Sofisticação",
            texto: "Ambientes aconchegantes com móveis de alto padrão.",
            botao: "Veja os Produtos",
            link: "/produtos"
          },
          {
            imagem: "/img/card3.avif",
            titulo: "Atendimento Exclusivo",
            texto: "Fale com especialistas e crie o projeto ideal para sua casa.",
            botao: "Fale Conosco",
            link: "/atendimento"
          }
        ].map((card, index) => (
          <div
            key={index}
            className="card-gigante"
            style={{ backgroundImage: `url('${card.imagem}')` }}
          >
            <div className="overlay"></div>
            <div className="conteudo-card">
              <h2>{card.titulo}</h2>
              <p>{card.texto}</p>
              <a href={card.link} className="botao-card">{card.botao}</a>
            </div>
          </div>
        ))}
      </section>

        

      {/* Botão voltar ao topo */}
      {mostrarSeta && (
        <button
          className="voltar-topo"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          ↑
        </button>
      )}
    </div>
  );
}
