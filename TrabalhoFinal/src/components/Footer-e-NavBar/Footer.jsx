  import React from 'react';
  import {
    FaWhatsapp,
    FaInstagram,
    FaFacebook,
    FaPinterest,
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaCcPaypal,
    FaCcApplePay
  } from 'react-icons/fa';
  import { MdEmail } from 'react-icons/md';
  import './Footer.css';

  const Footer = () => (
    <footer className="footer">
      {/* Siga-nos */}
      <div className="footer-top">
        <h3>Siga-nos</h3>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
        </div>
      </div>

      {/* Seções de contato, loja e pagamento */}
      <div className="footer-content">
        <div className="footer-section">
          <h4>Atendimento</h4>
          <p><FaWhatsapp /> (11) 99999‑8888</p>
          <p><MdEmail /> contato@Mc.com.br</p>
        </div>
        <div className="footer-section">
          <h4>Endereço</h4>
          <p>Av. dos Móveis, 1234</p>
          <p>São Paulo – SP</p>
          <p>Seg–Sex: 08h–18h</p>
        </div>
        <div className="footer-section">
          <h4>Formas de Pagamento</h4>
          <div className="payment-icons">
            <FaCcVisa title="Visa" />
            <FaCcMastercard title="Mastercard" />
            <FaCcAmex title="American Express" />
            <FaCcPaypal title="PayPal" />
            <FaCcApplePay title="Apple Pay" />
          </div>
        </div>
        <div className="footer-section newsletter">
          <h4>Email</h4>
          <p>Receba ofertas exclusivas!</p>
          <form onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Seu e‑mail" />
            <button type="submit">OK</button>
          </form>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Mc. Todos os direitos reservados.
      </div>
    </footer>
  );

  export default Footer;
