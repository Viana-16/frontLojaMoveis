// AdicionarEndereco.jsx
import React, { useState } from 'react';
import './AdicionarEndereco.css';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

const AdicionarEndereco = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    complemento: '',
    estado: '',
    cidade: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buscarCEP = async () => {
    if (form.cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm(prev => ({
          ...prev,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enderecoCompleto = `${form.rua}, ${form.numero}, ${form.bairro}, ${form.cidade} - ${form.estado}, CEP: ${form.cep}, Compl.: ${form.complemento}`;

    const body = {
      usuarioId: user?.id || '',
      textoEndereco: enderecoCompleto
    };

    try {
      const res = await fetch('https://localhost:7252/api/Endereco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        alert('Endereço cadastrado com sucesso!');
        navigate('/meuperfil');
      } else {
        alert('Erro ao cadastrar endereço');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <form className="form-endereco" onSubmit={handleSubmit}>
      <h2>Adicionar Endereço</h2>
      <div className="row">
        <input name="nome" placeholder="Nome *" value={form.nome} onChange={handleChange} required />
        <input name="sobrenome" placeholder="Sobrenome *" value={form.sobrenome} onChange={handleChange} required />
      </div>
      <input name="cep" placeholder="CEP *" value={form.cep} onChange={handleChange} onBlur={buscarCEP} required />

      <div className="row">
        <input name="rua" placeholder="Endereço (Rua, Avenida...) *" value={form.rua} onChange={handleChange} required />
        <input name="numero" placeholder="Número *" value={form.numero} onChange={handleChange} required />
      </div>

      <div className="row">
        <input name="bairro" placeholder="Bairro *" value={form.bairro} onChange={handleChange} required />
        <input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
      </div>

      <div className="row">
        <input name="estado" placeholder="Estado *" value={form.estado} onChange={handleChange} required disabled />
        <input name="cidade" placeholder="Cidade *" value={form.cidade} onChange={handleChange} required disabled />
      </div>

      <input name="telefone" placeholder="Celular / Telefone *" value={form.telefone} onChange={handleChange} required />

      <button type="submit">Salvar Endereço</button>
    </form>
  );
};

export default AdicionarEndereco;
