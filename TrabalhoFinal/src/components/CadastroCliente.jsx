import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroCliente.css';
const CadastroCliente = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: ''
  });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')               // remove não dígitos
        .replace(/(\d{3})(\d)/, '$1.$2')  // 000.000
        .replace(/(\d{3})(\d)/, '$1.$2')  // 000.000.000
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // 000.000.000-00
    }

    if (name === 'telefone') {
      formattedValue = value
        .replace(/\D/g, '')                                // remove não dígitos
        .replace(/^(\d{2})(\d)/, '($1) $2')                // (00) 00000
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');            // (00) 00000-0000
    }

    setCliente({ ...cliente, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:7252/api/Cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      const text = await res.text();

      if (res.ok) {
        navigate('/conta');
      } else {
        setMensagem(text);
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input name="nome" value={cliente.nome} onChange={handleChange} required />

        <label>Email:</label>
        <input name="email" type="email" value={cliente.email} onChange={handleChange} required />

        <label>CPF:</label>
        <input name="cpf" value={cliente.cpf} onChange={handleChange} maxLength={14} required />

        <label>Telefone:</label>
        <input name="telefone" value={cliente.telefone} onChange={handleChange} maxLength={15} required />
        
        <label>Senha:</label>
        <input name="senha" type="password" value={cliente.senha} onChange={handleChange} required />

        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}
    </div>
  );
};

export default CadastroCliente;
