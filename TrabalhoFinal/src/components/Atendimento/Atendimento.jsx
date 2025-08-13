import { useState, useEffect } from 'react';
import CardAtendimento from '../Atendimento/CardAtendimento';
import Modal from './Modal';
import './Atendimento.css';

const dadosAtendimento = [
  {
    titulo: 'Atendimento via WhatsApp',
    descricao: 'Fale com a gente pelo WhatsApp para orçamentos, dúvidas e suporte.'
  },
  {
    titulo: 'Atendimento na Loja',
    descricao: 'Nosso time está pronto para te receber com atenção e cuidado.'
  },
  {
    titulo: 'Atendimento Online',
    descricao: 'Use nosso chat ao vivo ou e-mail para ser atendido de onde estiver.'
  }
];

const dadosCardsGrandes = [
  {
    titulo: "Acompanhamento de Pedido e Entrega",
    descricao: "Veja como acompanhar todas as etapas do seu pedido e rastrear a sua entrega.",
    botao: "Como Acompanhar",
    logo: "/img/logoatend.png",
    conteudo: (
      <>
        <h2>Acompanhamento do pedido e entrega</h2>
        <p>Depois que o pagamento do pedido for confirmado, você acompanha o status:</p>
        <ul>
          <li>Por e-mail ou SMS: enviamos a nota fiscal e te avisamos quando seu pedido estiver sendo preparado ou for enviado;</li>
          <li>Na área do cliente do site: faça login no site e selecione seu pedido para acessar o status ou link de rastreio detalhado;</li>
          <li>No WhatsApp: você consulta o status do pedido a qualquer momento pelo WhatsApp;</li>
          <li>No app: ativando as notificações por push ou acessando o ícone Pedidos dentro do seu perfil.</li>
        </ul>
      </>
    )
  },
  {
    titulo: "Cancelamento e Estorno",
    descricao: "Veja o passo a passo para cancelamento e como funciona o saldo e estorno.",
    botao: "Como Cancelar",
    logo: "/img/logoatend.png",
    conteudo: (
      <>
        <h2>Cancelamento e estorno</h2>
        <p>Você pode cancelar sua compra a qualquer momento antes da entrega ou solicitar a devolução em até 7 dias corridos após receber o produto.</p>
        <p>Solicite o cancelamento pela sua área do cliente ou pelo WhatsApp. Ao abrir a solicitação, dependendo da forma de pagamento, você já poderá escolher se deseja reembolso como saldo para novas compras ou estorno.</p>
        <p>Você receberá um e-mail com os detalhes do reembolso, considerando os prazos para cancelamento antes ou depois da entrega.</p>
      </>
    )
  },
  {
    titulo: "Problema com o Produto",
    descricao: "Veja o que fazer se o seu produto chegou com algum problema (defeito, avaria, item errado).",
    botao: "Como Resolver",
    logo: "/img/logoatend.png",
    conteudo: (
      <>
        <h2>Problema com o produto</h2>
        <p>O produto chegou com algum problema? A gente pode te ajudar!</p>
        <p>O prazo de garantia pela MadeiraMadeira é de 90 dias após a entrega. Se recebeu o produto errado, com defeitos ou peças faltando, faremos o envio ou substituição.</p>
        <p>Abra a solicitação na sua área do cliente, selecione o pedido e a opção que descreve o problema. Nosso time vai entrar em contato.</p>
      </>
    )
  },
  {
    titulo: "Troca e Devolução",
    descricao: "Veja como solicitar troca e devolução. Use o saldo em um novo pedido ou solicite o estorno.",
    botao: "Como Trocar",
    logo: "/img/logoatend.png",
    conteudo: (
      <>
        <h2>Troca e devolução</h2>
        <p>Se deseja trocar o produto, abra uma solicitação de troca na área do cliente. O pedido será cancelado e o saldo ficará disponível para nova compra ou estorno.</p>
        <p>Verifique a política de devolução. O produto deve estar desmontado e embalado corretamente.</p>
      </>
    )
  },
  {
    titulo: "Alterar meu Cadastro",
    descricao: "Altere ou visualize seus dados cadastrados na área do cliente.",
    botao: "Como Alterar Dados",
    logo: "/img/logoatend.png",
    conteudo: (
      <>
        <h2>Alterar meu cadastro</h2>
        <p>Na área do cliente no site ou app, você pode atualizar senha, nome, telefone, endereço e mais.</p>
        <p>Para alterar o e-mail, fale conosco pelo WhatsApp.</p>
      </>
    )
  },
  {
    titulo: "Problema com a Entrega",
    descricao: "Se houve atraso ou problema com a entrega, saiba como resolver.",
    botao: "Como Resolver",
    logo: "/img/logoatend.png",
    conteudo: (
      <>
        <h2>Problema com a entrega</h2>
        <p>Se houve atraso, entrega errada ou outro problema, solicite atendimento na área do cliente.</p>
        <p>Verifique o link de rastreio e informações da transportadora antes de abrir a solicitação.</p>
      </>
    )
  }
];

function Atendimento() {
  const [pesquisa, setPesquisa] = useState('');
  const [texto, setTexto] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [conteudoModal, setConteudoModal] = useState(null);

  const titulo = 'Central de Atendimento';

  useEffect(() => {
    let i = 0;
    const intervalo = setInterval(() => {
      setTexto(titulo.slice(0, i));
      i++;
      if (i > titulo.length) clearInterval(intervalo);
    }, 80);
    return () => clearInterval(intervalo);
  }, []);

  const cardsFiltrados = dadosAtendimento.filter(card =>
    card.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
    card.descricao.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const abrirModal = (conteudo) => {
    setConteudoModal(conteudo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setConteudoModal(null);
  };

  return (
    <div className="pagina-atendimento">
      <h1 className="titulo-profissional">{texto}</h1>
      <p>Estamos aqui para ajudar! Conheça nossos canais de atendimento:</p>

      <input
        type="text"
        placeholder="Digite sua dúvida..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className="barra-pesquisa"
      />

      <div className="cards-container">
        {cardsFiltrados.map((card, index) => (
          <CardAtendimento
            key={index}
            titulo={card.titulo}
            descricao={card.descricao}
          />
        ))}
        {cardsFiltrados.length === 0 && (
          <p style={{ marginTop: '20px', fontStyle: 'italic' }}>Nenhum resultado encontrado.</p>
        )}
      </div>

      <div className="cards-grandes-container">
        {dadosCardsGrandes.map((item, index) => (
          <div key={index} className="card-grande">
            <div className="logo-card">
              <img src={item.logo} alt={`${item.titulo} logo`} className="logo-imagem" />
            </div>
            <h2>{item.titulo}</h2>
            <div className="descricao-e-botao">
              <p className="descricao-grande">{item.descricao}</p>
              <button className="botao-grande" onClick={() => abrirModal(item.conteudo)}>
                {item.botao}
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalAberto && <Modal onClose={fecharModal} conteudo={conteudoModal} />}
    </div>
  );
}

export default Atendimento;