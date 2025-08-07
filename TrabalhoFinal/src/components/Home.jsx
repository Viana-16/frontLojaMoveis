import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [produtosAleatorios, setProdutosAleatorios] = useState([]);
  const [mostrarSeta, setMostrarSeta] = useState(false);

  // Buscar produtos só uma vez
  useEffect(() => {
    fetch("https://lojamoveis.onrender.com/api/Produto")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data);

        // Embaralha apenas uma vez para não causar re-render
        const embaralhado = [...data].sort(() => Math.random() - 0.5);
        setProdutosAleatorios(embaralhado);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  // Mostrar botão de scroll para o topo
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

  return (
    <div className="home">
      {/* BANNER PRINCIPAL */}
      <section className="banner">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="banner-swiper"
        >
          <SwiperSlide><img src="/img/BannerHome1.png" alt="Banner 1" /></SwiperSlide>
          <SwiperSlide><img src="/img/BannerHome2.png" alt="Banner 2" /></SwiperSlide>
          <SwiperSlide><img src="/img/BannerHome3.png" alt="Banner 3" /></SwiperSlide>
        </Swiper>
      </section>

      {/* CATEGORIAS */}
      <h2 className="titulo-categorias">Navegue por Categorias e Ambientes</h2>
      <section className="grid-categorias">
        {[
          { nome: "Guarda-Roupas", imagem: "/img/guardaroupa.avif", rota: "/guarda-roupas" },
          { nome: "Sala de Estar", imagem: "/img/saladeestar.avif", rota: "/sala-de-estar" },
          { nome: "Sofás", imagem: "/img/sofas.avif", rota: "/sofas" },
          { nome: "Cozinha", imagem: "/img/cozinha.avif", rota: "/cozinha" },
          { nome: "Banheiro", imagem: "/img/banheiro.avif", rota: "/banheiro" },
          { nome: "Escritorio", imagem: "/img/escritorio.avif", rota: "/escritorio" },
          { nome: "Painéis", imagem: "/img/paineis.avif", rota: "/paineis" },
          { nome: "Portas e Janelas", imagem: "/img/portasejanelas.avif", rota: "/portas-e-janelas" },
          { nome: "Camas", imagem: "/img/cama.avif", rota: "/camas" },
          { nome: "Lavanderia", imagem: "/img/lavanderia.avif", rota: "/lavanderia" }
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

      {/* PRODUTOS - PRIMEIRA SEÇÃO */}
     <section className="produtos">
  <h2>Veja Nossos Produtos</h2>
  <div className="lista-produtos">
    {produtosAleatorios.slice(0, 8).map((produto) => (
      <div
        className="produto-card"
        key={produto.id}
        onClick={() => window.location.href = `/produto/${produto.id}`}
      >
        <img src={produto.imagemUrl} alt={produto.nome} />
        <div className="icone-carrinho">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div className="info-simples">
          <h3>{produto.nome}</h3>
          <p className="preco">R$ {produto.preco}</p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* CARDS PROMOCIONAIS GIGANTES */}
     <section className="cards-gigantes-lado-a-lado">
  {[
    {
      imagem: "/img/MoveisMcategoria.png",
      link: "/sobre"
    },
    {
      imagem: "/img/MoveisMcategoria.png",
      link: "/produtos"
    },
    {
      imagem: "/img/MoveisMcategoria.png",
      link: "/atendimento"
    }
  ].map((card, index) => (
    <Link
      to={card.link}
      key={index}
      className="card-gigante"
      style={{ backgroundImage: `url('${card.imagem}')` }}
    >
      <div className="overlay"></div>
      <div className="conteudo-card">
        <h2>{card.titulo}</h2>
        <p>{card.texto}</p>
      </div>
    </Link>
  ))}
</section>

      {/* PRODUTOS - SEGUNDA SEÇÃO */}
      <section className="produtos destaque-secundario">
        <h2>Confira Também</h2>
        <div className="lista-produtos">
         {produtosAleatorios.slice(0, 8).map((produto) => (
      <div
        className="produto-card"
        key={produto.id}
        onClick={() => window.location.href = `/produto/${produto.id}`}
      >
        <img src={produto.imagemUrl} alt={produto.nome} />
        <div className="icone-carrinho">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div className="info-simples">
          <h3>{produto.nome}</h3>
          <p className="preco">R$ {produto.preco}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* CARD GIGANTE FINAL */}
      <section className="card-final-destaque" style={{ backgroundImage: "url('/img/BannerGigante.webp')" }}>
        <div className="overlay"></div>
      </section>

      {/* BOTÃO VOLTAR AO TOPO */}
      {mostrarSeta && (
        <button
          className="voltar-topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </div>
  );
}