import React from "react";
import "./Sobre.css";

function Sobre() {
  return (
    <div className="pagina-sobre">
      <div className="titulo-container">
        <h1 className="titulo-animado">Sobre Nós</h1>
      </div>

      <div className="cards-sobre">
        <div className="card-sobre animar">
          <h2>Quem Somos</h2>
          <p>
            Somos uma loja especializada em móveis de madeira, comprometida com qualidade, durabilidade e design funcional. Nosso objetivo é transformar ambientes com peças únicas e feitas para durar.
          </p>
        </div>

        <div className="card-sobre animar">
          <h2>Missão</h2>
          <p>
            Oferecer móveis de qualidade com design diferenciado, promovendo conforto e satisfação aos nossos clientes.
          </p>
        </div>

        <div className="card-sobre animar">
          <h2>Visão</h2>
          <p>
            Ser referência nacional em móveis de madeira, reconhecida pela excelência no atendimento e inovação no mercado moveleiro.
          </p>
        </div>

        <div className="card-sobre animar">
          <h2>Valores</h2>
          <ul>
            <li>Comprometimento com a qualidade</li>
            <li>Atendimento com empatia</li>
            <li>Respeito ao meio ambiente</li>
            <li>Inovação e criatividade</li>
          </ul>
        </div>

        <div className="card-sobre animar">
          <h2>Compromisso com o Cliente</h2>
          <p>
            Prezamos por um atendimento ágil e atencioso, oferecendo suporte em todas as etapas da sua compra, da escolha à entrega. Sua satisfação é nossa prioridade.
          </p>
        </div>

        <div className="card-sobre animar">
          <h2>Sustentabilidade</h2>
          <p>
            Trabalhamos com madeira de origem certificada e adotamos práticas sustentáveis para minimizar o impacto ambiental. Cuidar do planeta também faz parte do nosso compromisso.
          </p>
        </div>
      </div>

      <div className="botoes-sobre">
        <button onClick={() => window.location.href = "/"}>Voltar à Home</button>
        <button onClick={() => window.location.href = "/atendimento"}>Fale Conosco</button>
      </div>
    </div>
  );
}

export default Sobre;