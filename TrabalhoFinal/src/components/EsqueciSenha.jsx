import React, { useState } from 'react';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:7252/api/Login/esqueci-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })  // importante ser objeto { email: valor }
      });

      if (res.ok) {
        setMensagem('Verifique seu e-mail para redefinir a senha.');
      } else {
        const texto = await res.text();
        setMensagem(`Erro: ${texto}`);
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Esqueci minha senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Confirmar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default EsqueciSenha;
