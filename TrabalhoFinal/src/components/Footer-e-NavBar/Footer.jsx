import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBarcode,
  faQrcode,
  faCreditCard 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faCcVisa, 
  faCcMastercard, 
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Seção Contato */}
        <div className="footer-section">
          <h3 className="footer-title">Contato</h3>
          <ul className="footer-list">
            <li>
              <FaMapMarkerAlt className="footer-icon" />
              <span>Av. dos Móveis, 1234 - Minas Gerais/MG</span>
            </li>
            <li>
              <FaPhone className="footer-icon" />
              <span>(31) 9999-9999</span>
            </li>
            <li>
              <FaEnvelope className="footer-icon" />
              <span>moveisclassic@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Seção Links Rápidos */}
        <div className="footer-section">
          <h3 className="footer-title">Links Rápidos</h3>
          <ul className="footer-list">
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/">Nossos Produtos</a></li>
            <li><a href="/atendimento">Fale Conosco</a></li>
            {/* <li><a href="/politica-de-privacidade">Política de Privacidade</a></li> */}
          </ul>
        </div>

        {/* Seção Redes Sociais */}
        <div className="footer-section">
          <h3 className="footer-title">Redes Sociais</h3>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://wa.me/5511999999999" aria-label="WhatsApp">
              <FaWhatsapp className="social-icon" />
            </a>
          </div>
          
          <div className="payment-methods">
        <h4>Formas de Pagamento</h4>
        <div className="payment-icons">
          <FontAwesomeIcon icon={faCcVisa} className="payment-icon" title="Visa" />
          <FontAwesomeIcon icon={faCcMastercard} className="payment-icon" title="Mastercard" />
          <FontAwesomeIcon icon={faBarcode} className="payment-icon" title="Boleto" />
          <FontAwesomeIcon icon={faQrcode} className="payment-icon" title="Pix" />
        </div>
        <p className="payment-text">
          <FontAwesomeIcon icon={faCreditCard} /> Parcelamos em até 12x sem juros
        </p>
      </div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Móveis Clássic - Todos os direitos reservados</p>
        <p>CNPJ: 12.345.678/0001-99</p>
      </div>
    </footer>
  );
};

export default Footer;