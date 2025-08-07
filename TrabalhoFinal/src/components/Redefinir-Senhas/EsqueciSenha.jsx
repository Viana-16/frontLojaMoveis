// import React, { useState } from 'react';

// const EsqueciSenha = () => {
//   const [email, setEmail] = useState('');
//   const [mensagem, setMensagem] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('https://localhost:7252/api/Login/esqueci-senha', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email })  // importante ser objeto { email: valor }
//       });

//       if (res.ok) {
//         setMensagem('Verifique seu e-mail para redefinir a senha.');
//       } else {
//         const texto = await res.text();
//         setMensagem(`Erro: ${texto}`);
//       }
//     } catch {
//       setMensagem('Erro ao conectar com o servidor.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto' }}>
//       <h2>Esqueci minha senha</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Confirmar</button>
//       </form>
//       {mensagem && <p>{mensagem}</p>}
//     </div>
//   );
// };

// export default EsqueciSenha;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EsqueciSenha.css';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:7252/api/Login/esqueci-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
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
    <div className="esqueci-container">
      <h2 className="esqueci-titulo">Esqueci minha senha</h2>
      <form onSubmit={handleSubmit} className="esqueci-form">
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="suubmit-button">Enviar Link</button>
      </form>
      
      {mensagem && !showSuccessModal && (
        <p className={`mensagem ${mensagem.includes('Verifique') ? 'mensagem-sucesso' : 'mensagem-erro'}`}>
          {mensagem}
        </p>
      )}

      {/* Modal de Sucesso - Idêntico ao do RedefinirSenha */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Email Enviado!</h3>
            </div>
            <div className="modal-body">
              <div className="success-icon">✓</div>
              <p>Enviamos um link para redefinição de senha para seu email.</p>
              <p>Redirecionando para a página de login...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EsqueciSenha;