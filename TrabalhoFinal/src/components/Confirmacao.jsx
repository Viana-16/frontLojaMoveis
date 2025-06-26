import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmacao = () => {
  const { state } = useLocation();

  return (
    <div className="confirmacao">
      <h2>Pedido Confirmado!</h2>
      <p>Seu pedido foi realizado com sucesso.</p>
      {state?.endereco && (
        <div className="dados-endereco">
          <p><strong>Endereço:</strong></p>
          <p>Rua {state.endereco.rua}, {state.endereco.numero}</p>
          <p>{state.endereco.cidade} - {state.endereco.estado}</p>
          <p>CEP: {state.endereco.cep}</p>
        </div>
      )}
      <Link to="/">Voltar à loja</Link>
    </div>
  );
};

export default Confirmacao;
