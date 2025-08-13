import React from 'react';
import './Sobre.css';
import { FaHandshake, FaAward, FaTruck, FaLeaf } from 'react-icons/fa';

const Sobre = () => {
  return (
    <div className="sobre-nos-container">
      {/* Banner Hero */}
      <section className="sobre-hero">
        <div className="hero-content">
          <h1>Móveis Clássic</h1>
          <p className="hero-subtitle">Tradição em móveis de qualidade desde 1995</p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="nossa-historia">
        <div className="container">
          <div className="historia-content">
            <div className="historia-texto">
              <h2>Nossa História</h2>
              <p>
                Fundada em 1995 na cidade de São Paulo, a Móveis Clássic nasceu da paixão por móveis que unem 
                durabilidade, conforto e design atemporal. Começamos como uma pequena oficina de marcenaria 
                e hoje somos referência nacional em móveis clássicos e contemporâneos.
              </p>
              <p>
                Cada peça que criamos carrega nossa dedicação à excelência em acabamento e nossa busca 
                incessante por materiais da mais alta qualidade.
              </p>
            </div>
            <div className="historia-imagem">
              <img src="/img/sobre-site.jpg" alt="Oficina Móveis Clássic" />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="diferenciais">
        <div className="container">
          <h2 className="section-title">O Que Nos Diferencia</h2>
          <div className="diferenciais-grid">
            <div className="diferencial-card">
              <FaAward className="diferencial-icon" />
              <h3>Qualidade Atestada</h3>
              <p>Móveis certificados com selo de qualidade do IBDI</p>
            </div>
            <div className="diferencial-card">
              <FaHandshake className="diferencial-icon" />
              <h3>Atendimento Personalizado</h3>
              <p>Consultores especializados para cada projeto</p>
            </div>
            <div className="diferencial-card">
              <FaTruck className="diferencial-icon" />
              <h3>Entrega em Todo Brasil</h3>
              <p>Logística cuidadosa para proteger seus móveis</p>
            </div>
            <div className="diferencial-card">
              <FaLeaf className="diferencial-icon" />
              <h3>Sustentabilidade</h3>
              <p>Madeira 100% de reflorestamento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="valores">
        <div className="container">
          <div className="valores-grid">
            <div className="valor-card">
              <h3>Missão</h3>
              <p>
                Criar móveis que unam beleza, funcionalidade e durabilidade, transformando ambientes 
                e proporcionando conforto e elegância para nossos clientes.
              </p>
            </div>
            <div className="valor-card">
              <h3>Visão</h3>
              <p>
                Ser reconhecida como a principal referência em móveis clássicos no Brasil, mantendo 
                nossa essência artesanal enquanto inovamos em design e sustentabilidade.
              </p>
            </div>
            <div className="valor-card">
              <h3>Valores</h3>
              <ul>
                <li>Excelência em acabamento</li>
                <li>Respeito ao meio ambiente</li>
                <li>Honestidade nas relações</li>
                <li>Inovação constante</li>
                <li>Amor pelo ofício</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      {/* <section className="equipe">
        <div className="container">
          <h2 className="section-title">Conheça Nossa Equipe</h2>
          <div className="equipe-grid">
            <div className="membro">
              <img src="/img/equipe/joao.jpg" alt="João Silva" />
              <h3>João Silva</h3>
              <p>Fundador e Marceneiro Mestre</p>
            </div>
            <div className="membro">
              <img src="/img/equipe/maria.jpg" alt="Maria Santos" />
              <h3>Maria Santos</h3>
              <p>Designer de Interiores</p>
            </div>
            <div className="membro">
              <img src="/img/equipe/carlos.jpg" alt="Carlos Oliveira" />
              <h3>Carlos Oliveira</h3>
              <p>Especialista em Acabamentos</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      {/* <section className="cta-sobre">
        <div className="container">
          <h2>Pronto para transformar seu espaço?</h2>
          <p>Visite nossa loja ou entre em contato para um atendimento personalizado</p>
          <div className="cta-buttons">
            <a href="/contato" className="btn-primary">Fale Conosco</a>
            <a href="/lojas" className="btn-secondary">Nossas Lojas</a>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Sobre;