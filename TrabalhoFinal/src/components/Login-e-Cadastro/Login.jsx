// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../components/UserContext'; // ajuste o caminho conforme necessário
// import '../../components/Login-e-Cadastro/Login.css';

// const Login = () => {
//   const [loginData, setLoginData] = useState({ email: '', senha: '' });
//   const [mensagem, setMensagem] = useState('');
//   const navigate = useNavigate();
//   const { login } = useUser();

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('https://localhost:7252/api/Login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData),
//         credentials: 'include', // importante para cookies HttpOnly
//       });

//       const data = await res.json();

//       if (res.ok) {
//         login(data); // salva os dados e token no contexto e cookie

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

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>Já tenho uma conta MC</h2>
//         <p className="subtitulo-login">
//           Acesse sua conta para acompanhar seus pedidos, receber ofertas exclusivas e muito mais.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <label>Email:</label>
//           <input
//             name="email"
//             type="email"
//             value={loginData.email}
//             onChange={handleChange}
//             required
//           />

//           <label>Senha:</label>
//           <input
//             name="senha"
//             type="password"
//             value={loginData.senha}
//             onChange={handleChange}
//             required
//           />

//           <div className="forgot-password">
//             <a href="/esqueci-senha">Esqueci minha senha</a>
//           </div>

//           <button type="submit">Entrar</button>
//         </form>

//         {mensagem && <p className="mensagem-erro">{mensagem}</p>}

//         <button
//           type="button"
//           className="cadastro-btn"
//           onClick={() => navigate('/cadastro')}
//         >
//           Cadastre-se
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/UserContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import '../../components/Login-e-Cadastro/Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      const res = await fetch('https://localhost:7252/api/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-placeholder">
            <span className="logo-text">Móveis Classic</span>
          </div>
          <h2>Bem-vindo de volta</h2>
          <p className="subtitulo-login">
            Acesse sua conta para acompanhar pedidos e ofertas exclusivas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-icon">
              <Mail size={18} />
            </div>
            <input
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
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
              value={loginData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="login-options">
            <a href="/esqueci-senha" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <>
                Entrar <ArrowRight size={18} />
              </>
            )}
          </button>

          {mensagem && <p className="mensagem-erro">{mensagem}</p>}

          <div className="divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="register-button"
            onClick={() => navigate('/cadastro')}
          >
            Criar uma conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;