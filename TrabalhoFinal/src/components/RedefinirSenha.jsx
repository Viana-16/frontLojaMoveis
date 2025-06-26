// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const RedefinirSenha = () => {
//   const { token } = useParams(); // pega o token da URL
//   const [novaSenha, setNovaSenha] = useState('');
//   const [confirmarSenha, setConfirmarSenha] = useState('');
//   const [mensagem, setMensagem] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (novaSenha !== confirmarSenha) {
//       setMensagem('As senhas não coincidem.');
//       return;
//     }

//     try {
//       const res = await fetch(`https://localhost:7252/api/Login/redefinir-senha/${token}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ novaSenha })
//       });

//       if (res.ok) {
//         setMensagem('Senha redefinida com sucesso!');
//         setTimeout(() => navigate('/login'), 3000);
//       } else {
//         const erro = await res.text();
//         setMensagem(`Erro: ${erro}`);
//       }
//     } catch {
//       setMensagem('Erro ao conectar com o servidor.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto' }}>
//       <h2>Redefinir Senha</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Nova Senha:</label>
//         <input
//           type="password"
//           value={novaSenha}
//           onChange={(e) => setNovaSenha(e.target.value)}
//           required
//         />

//         <label>Confirmar Senha:</label>
//         <input
//           type="password"
//           value={confirmarSenha}
//           onChange={(e) => setConfirmarSenha(e.target.value)}
//           required
//         />

//         <button type="submit">Confirmar</button>
//       </form>
//       {mensagem && <p style={{ color: mensagem.includes('sucesso') ? 'green' : 'red' }}>{mensagem}</p>}
//     </div>
//   );
// };

// export default RedefinirSenha;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedefinirSenha = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:7252/api/Login/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha }) // <-- Correto agora
      });

      if (res.ok) {
        setMensagem('Senha redefinida com sucesso!');
        setTimeout(() => navigate('/conta'), 2000);
      } else {
        const erro = await res.text();
        setMensagem(`Erro: ${erro}`);
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Nova Senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <button type="submit">Redefinir</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default RedefinirSenha;

