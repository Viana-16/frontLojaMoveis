// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const RedefinirSenha = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [novaSenha, setNovaSenha] = useState('');
//   const [mensagem, setMensagem] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('https://localhost:7252/api/Login/redefinir-senha', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, novaSenha }) // <-- Correto agora
//       });

//       if (res.ok) {
//         setMensagem('Senha redefinida com sucesso!');
//         setTimeout(() => navigate('/conta'), 2000);
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
//         <button type="submit">Redefinir</button>
//       </form>
//       {mensagem && <p>{mensagem}</p>}
//     </div>
//   );
// };

// export default RedefinirSenha;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RedefinirSenha.css';

const RedefinirSenha = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:7252/api/Login/redefinir-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha })
      });

      if (res.ok) {
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate('/conta');
        }, 2000);
      } else {
        const erro = await res.text();
        setMensagem(`Erro: ${erro}`);
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="redefinir-container">
      <h2 className="redefinir-titulo">Redefinir Senha</h2>
      <form onSubmit={handleSubmit} className="redefinir-form">
        <div className="form-group">
          <label className="form-label">Nova Senha:</label>
          <input
            type="password"
            className="form-input"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            minLength="6"
          />
          <small className="password-hint">Mínimo de 6 caracteres</small>
        </div>
        <button type="submit" className="subbmit-button">Redefinir Senha</button>
      </form>
      
      {mensagem && !showSuccessModal && (
        <p className={`mensagem ${mensagem.includes('sucesso') ? 'mensagem-sucesso' : 'mensagem-erro'}`}>
          {mensagem}
        </p>
      )}

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Senha Redefinida!</h3>
            </div>
            <div className="modal-body">
              <div className="success-icon">✓</div>
              <p>Sua senha foi redefinida com sucesso.</p>
              <p>Redirecionando para a página de login...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedefinirSenha;

