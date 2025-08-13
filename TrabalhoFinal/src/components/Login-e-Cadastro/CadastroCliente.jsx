import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CreditCard, Phone, ArrowRight } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return cpf.endsWith(`${digito1}${digito2}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    if (name === 'telefone') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }

    setCliente({ ...cliente, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cpfLimpo = cliente.cpf.replace(/\D/g, '');
    if (!validarCPF(cpfLimpo)) {
      setMensagem('CPF inválido. Por favor, insira um CPF verdadeiro.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://lojamoveis.onrender.com/api/Cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cliente,
          cpf: cpfLimpo,
          telefone: cliente.telefone.replace(/\D/g, '')
        }),
      });

      const text = await res.text();

      if (res.ok) {
        navigate('/conta');
      } else {
        setMensagem(text || 'Erro ao cadastrar');
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <div className="logo-placeholder">
            <span className="logo-text">Móveis Classic</span>
          </div>
          <h2>Crie sua conta</h2>
          <p className="subtitulo-cadastro">
            Preencha seus dados para acessar ofertas exclusivas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="input-group">
            <div className="input-icon">
              <User size={18} />
            </div>
            <input
              name="nome"
              value={cliente.nome}
              onChange={handleChange}
              placeholder="Nome completo"
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Mail size={18} />
            </div>
            <input
              name="email"
              type="email"
              value={cliente.email}
              onChange={handleChange}
              placeholder="Seu melhor e-mail"
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <CreditCard size={18} />
            </div>
            <input
              name="cpf"
              value={cliente.cpf}
              onChange={handleChange}
              placeholder="CPF"
              maxLength={14}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Phone size={18} />
            </div>
            <input
              name="telefone"
              value={cliente.telefone}
              onChange={handleChange}
              placeholder="Telefone"
              maxLength={15}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Lock size={18} />
            </div>
            <input
              name="senha"
              type="password"
              value={cliente.senha}
              onChange={handleChange}
              placeholder="Crie uma senha"
              required
            />
          </div>

          <button type="submit" className="cadastro-button" disabled={loading}>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <>
                Cadastrar <ArrowRight size={18} />
              </>
            )}
          </button>

          {mensagem && (
            <p className={`mensagem ${mensagem.includes('inválido') ? 'erro' : 'info'}`}>
              {mensagem}
            </p>
          )}

          <div className="divider">
            <span>Já tem uma conta?</span>
          </div>

          <button
            type="button"
            className="loginn-button"
            onClick={() => navigate('/conta')}
          >
            Fazer login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroCliente;