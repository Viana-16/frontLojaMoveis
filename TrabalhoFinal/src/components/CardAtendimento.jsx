import { FaWhatsapp, FaStore, FaLaptop } from 'react-icons/fa';
import './Atendimento.css';

const icones = {
  'Atendimento via WhatsApp': <FaWhatsapp size={30} color="#25D366" />,
  'Atendimento na Loja': <FaStore size={30} color="#a67c52" />,
  'Atendimento Online': <FaLaptop size={30} color="#0078d7" />
};

function CardAtendimento({ titulo, descricao }) {
  return (
    <div className="card animated-card">
      <div className="icone-card">{icones[titulo]}</div>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}

export default CardAtendimento;