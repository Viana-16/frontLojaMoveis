


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../components/UserContext';
// import './Login.css';

// const Login = () => {
//   const [loginData, setLoginData] = useState({ email: '', senha: '' });
//   const [mensagem, setMensagem] = useState('');
//   const [mostrarModal, setMostrarModal] = useState(false);
//   const [emailRecuperacao, setEmailRecuperacao] = useState('');
//   const [mensagemRecuperacao, setMensagemRecuperacao] = useState('');

//   const navigate = useNavigate();
//   const { login } = useUser();

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMensagem('');

//     try {
//       const res = await fetch('https://localhost:7252/api/Login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         login(data);
//         if (data.tipo === 'cliente') {
//           navigate('/');
//         } else if (data.tipo === 'admin') {
//           navigate('/admin');
//         } else {
//           setMensagem('Tipo de usuário desconhecido.');
//         }
//       } else {
//         setMensagem(data.mensagem || 'Credenciais inválidas.');
//       }
//     } catch {
//       setMensagem('Erro ao conectar com o servidor.');
//     }
//   };

//   // 🔐 Envio do email para recuperação de senha
//   const handleRecuperarSenha = async () => {
//     setMensagemRecuperacao('');

//     try {
//       const res = await fetch('https://localhost:7252/api/Login/recuperar-senha', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: emailRecuperacao }),
//       });

//       const data = await res.text();

//       if (res.ok) {
//         setMensagemRecuperacao('Instruções enviadas para o seu e-mail.');
//       } else {
//         setMensagemRecuperacao(data || 'Erro ao tentar recuperar a senha.');
//       }
//     } catch {
//       setMensagemRecuperacao('Erro de conexão com o servidor.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input name="email" type="email" value={loginData.email} onChange={handleChange} required />

//         <label>Senha:</label>
//         <input name="senha" type="password" value={loginData.senha} onChange={handleChange} required />

//         <button type="submit">Entrar</button>
//       </form>

//       {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}

//       {/* <p>
//         <button onClick={() => setMostrarModal(true)} className="link-like-button">
//           Esqueceu a senha?
//         </button>
//       </p> */}

//       <p>
//   <a href="/esqueci-senha">Esqueci minha senha</a>
// </p>


//       <p>
//         Ainda não tem conta? <a href="/cadastro">Cadastre-se</a>
//       </p>

//       {mostrarModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Recuperar Senha</h3>
//             <input
//               type="email"
//               placeholder="Digite seu e-mail"
//               value={emailRecuperacao}
//               onChange={(e) => setEmailRecuperacao(e.target.value)}
//               required
//             />
//             <button onClick={handleRecuperarSenha}>Enviar</button>
//             <button className="fechar" onClick={() => setMostrarModal(false)}>Fechar</button>
//             {mensagemRecuperacao && <p style={{ color: 'green' }}>{mensagemRecuperacao}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // ajuste o caminho conforme necessário
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:7252/api/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include', // importante para cookies HttpOnly
      });

      const data = await res.json();

      if (res.ok) {
        login(data); // salva os dados e token no contexto e cookie

        if (data.tipo === 'cliente') {
          navigate('/');
        } else if (data.tipo === 'admin') {
          navigate('/admin');
        } else {
          setMensagem('Tipo de usuário desconhecido.');
        }
      } else {
        setMensagem(data.mensagem || 'Credenciais inválidas.');
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Já tenho uma conta MC</h2>
        <p className="subtitulo-login">
          Acesse sua conta para acompanhar seus pedidos, receber ofertas exclusivas e muito mais.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label>Senha:</label>
          <input
            name="senha"
            type="password"
            value={loginData.senha}
            onChange={handleChange}
            required
          />

          <div className="forgot-password">
            <a href="/esqueci-senha">Esqueci minha senha</a>
          </div>

          <button type="submit">Entrar</button>
        </form>

        {mensagem && <p className="mensagem-erro">{mensagem}</p>}

        <button
          type="button"
          className="cadastro-btn"
          onClick={() => navigate('/cadastro')}
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default Login;
