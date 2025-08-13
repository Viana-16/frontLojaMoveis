import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../Carrinho/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco({ ...endereco, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar o pedido e endereço para sua API

    // Simula finalização do pedido
    clearCart();
    navigate('/confirmacao', { state: { endereco } });
  };

  return (
    <div className="checkout">
      <h2>Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="formulario-endereco">
        <input name="rua" placeholder="Rua" required onChange={handleChange} />
        <input name="numero" placeholder="Número" required onChange={handleChange} />
        <input name="cidade" placeholder="Cidade" required onChange={handleChange} />
        <input name="estado" placeholder="Estado" required onChange={handleChange} />
        <input name="cep" placeholder="CEP" required onChange={handleChange} />
        <button type="submit">Finalizar Pedido</button>
      </form>
    </div>
  );
};

export default Checkout;
