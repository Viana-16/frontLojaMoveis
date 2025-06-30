// /* MeuPerfil.jsx */
// import React, { useEffect, useState } from 'react';
// import { User, MapPin, ShoppingCart, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './MeuPerfil.css';
// import { useUser } from './UserContext';

// const MeuPerfil = () => {
//   const { user, logout } = useUser();
//   const navigate = useNavigate();

//   const [cliente, setCliente]   = useState(null);
//   const [enderecos, setEnderecos] = useState([]);
//   const [pedidos, setPedidos]     = useState([]);
//   const [abaAtiva, setAbaAtiva]   = useState('dados');

//   const [mostrarFormulario, setMostrarFormulario] = useState(false);
//   const [novoEndereco, setNovoEndereco] = useState({
//     cep: '',
//     rua: '',
//     numero: '',
//     cidade: '',
//     estado: ''
//   });

//   const handleLogout = () => {
//     if (typeof logout === 'function') {
//       logout();
//     } else {
//       localStorage.clear();
//     }
//     navigate('/conta');
//   };

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchDados = async () => {
//       try {
//         const [cRes, eRes, pRes] = await Promise.all([
//           fetch(`https://localhost:7252/api/Cliente/email/${user.email}`, { credentials: 'include' }),
//           fetch(`https://localhost:7252/api/Endereco/cliente/${user.email}`, { credentials: 'include' }),
//           fetch(`https://localhost:7252/api/Pedido/cliente/${user.email}`,   { credentials: 'include' })
//         ]);

//         setCliente(await cRes.json());
//         setEnderecos(await eRes.json());
//         setPedidos(await pRes.json());
//       } catch (err) {
//         console.error('Erro ao buscar dados do perfil:', err);
//       }
//     };

//     fetchDados();
//   }, [user]);

//   const buscarEnderecoPorCep = async (cep) => {
//     try {
//       const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//       const data = await res.json();
//       if (!data.erro) {
//         setNovoEndereco((prev) => ({
//           ...prev,
//           rua: data.logradouro || '',
//           cidade: data.localidade || '',
//           estado: data.uf || ''
//         }));
//       }
//     } catch (err) {
//       console.error('Erro ao buscar CEP:', err);
//     }
//   };

//   const handleSalvarEndereco = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('https://localhost:7252/api/Endereco', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           emailCliente: user.email,
//           ...novoEndereco
//         })
//       });

//       if (res.ok) {
//         const novo = await res.json();
//         setEnderecos([...enderecos, novo]);
//         setMostrarFormulario(false);
//         setNovoEndereco({ cep: '', rua: '', numero: '', cidade: '', estado: '' });
//       }
//     } catch (err) {
//       console.error('Erro ao salvar endereço:', err);
//     }
//   };

//   const renderDados = () => cliente && (
//     <div className="dados-section">
//       <p><strong>Nome:</strong> {cliente.nome}</p>
//       <p><strong>Email:</strong> {cliente.email}</p>
//       <p><strong>CPF:</strong> {cliente.cpf}</p>
//       <p><strong>Telefone:</strong> {cliente.telefone}</p>
//     </div>
//   );

//   const renderEnderecos = () => (
//     <>
//       <button className="btn-adicionar" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
//         {mostrarFormulario ? 'Cancelar' : 'Adicionar Endereço de Entrega'}
//       </button>

//       {mostrarFormulario && (
//         <form className="form-endereco" onSubmit={handleSalvarEndereco}>
//           <input
//             type="text"
//             placeholder="CEP"
//             value={novoEndereco.cep}
//             onChange={(e) => {
//               const cep = e.target.value;
//               setNovoEndereco({ ...novoEndereco, cep });
//               if (cep.length === 8) buscarEnderecoPorCep(cep);
//             }}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Rua"
//             value={novoEndereco.rua}
//             onChange={(e) => setNovoEndereco({ ...novoEndereco, rua: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Número"
//             value={novoEndereco.numero}
//             onChange={(e) => setNovoEndereco({ ...novoEndereco, numero: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Cidade"
//             value={novoEndereco.cidade}
//             onChange={(e) => setNovoEndereco({ ...novoEndereco, cidade: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Estado"
//             value={novoEndereco.estado}
//             onChange={(e) => setNovoEndereco({ ...novoEndereco, estado: e.target.value })}
//             required
//           />
//           <button type="submit">Salvar Endereço</button>
//         </form>
//       )}

//       {enderecos.length ? (
//         <div className="grid-enderecos">
//           {enderecos.map((end, i) => (
//             <article key={i} className="card">
//               <p><strong>Rua:</strong> {end.rua}</p>
//               <p><strong>Número:</strong> {end.numero}</p>
//               <p><strong>Cidade:</strong> {end.cidade}</p>
//               <p><strong>Estado:</strong> {end.estado}</p>
//             </article>
//           ))}
//         </div>
//       ) : <p>Nenhum endereço cadastrado.</p>}
//     </>
//   );

//   const renderPedidos = () => (
//     pedidos.length ? (
//       <div className="grid-pedidos">
//         {pedidos.map((p, i) => (
//           <article key={i} className="card">
//             <p><strong>ID:</strong> {p.id}</p>
//             <p><strong>Data:</strong> {new Date(p.dataPedido).toLocaleDateString()}</p>
//             <p><strong>Total:</strong> R$ {p.total.toFixed(2)}</p>
//             <p><strong>Status:</strong> {p.status}</p>
//           </article>
//         ))}
//       </div>
//     ) : <p>Você ainda não fez nenhum pedido.</p>
//   );

//   return (
//     <div className="perfil-wrapper">
//       <aside className="sidebar">
//         <button className="btn-logout" onClick={handleLogout}>
//           <LogOut size={18} />
//           <span>Sair</span>
//         </button>

//         <div className="avatar">
//           <User size={72} strokeWidth={1.4} />
//         </div>
//         <p className="cliente-nome">{cliente?.nome || 'Cliente'}</p>

//         <nav className="menu-quadrados">
//           <button className={`square ${abaAtiva === 'dados' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('dados')}>
//             <User size={24} />
//             <span>Meus Dados</span>
//           </button>

//           <button className={`square ${abaAtiva === 'enderecos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('enderecos')}>
//             <MapPin size={24} />
//             <span>Endereço</span>
//           </button>

//           <button className={`square ${abaAtiva === 'pedidos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('pedidos')}>
//             <ShoppingCart size={24} />
//             <span>Meus Pedidos</span>
//           </button>
//         </nav>
//       </aside>

//       <section className="conteudo">
//         <h2>
//           {abaAtiva === 'dados'     && 'Meus Dados'}
//           {abaAtiva === 'enderecos' && 'Endereços Cadastrados'}
//           {abaAtiva === 'pedidos'   && 'Meus Pedidos'}
//         </h2>

//         {abaAtiva === 'dados'     && renderDados()}
//         {abaAtiva === 'enderecos' && renderEnderecos()}
//         {abaAtiva === 'pedidos'   && renderPedidos()}
//       </section>
//     </div>
//   );
// };

// export default MeuPerfil;


/* MeuPerfil.jsx */
import React, { useEffect, useState } from 'react';
import { User, MapPin, ShoppingCart, LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MeuPerfil.css';
import { useUser } from './UserContext';

const MeuPerfil = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [cliente, setCliente]   = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [pedidos, setPedidos]     = useState([]);
  const [abaAtiva, setAbaAtiva]   = useState('dados');
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const [formEndereco, setFormEndereco] = useState({
    nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: ''
  });

  const handleLogout = () => {
    if (typeof logout === 'function') {
      logout();
    } else {
      localStorage.clear();
    }
    navigate('/conta');
  };

  useEffect(() => {
    if (!user?.email) return;

    const fetchDados = async () => {
  try {
    const [cRes, eRes, pRes] = await Promise.all([
      fetch(`https://localhost:7252/api/Cliente/email/${user.email}`),
      fetch(`https://localhost:7252/api/Endereco/${user.email}`), // corrigido aqui
      fetch(`https://localhost:7252/api/Pedido/cliente/${user.email}`)
    ]);

    setCliente(await cRes.json());
    setEnderecos(await eRes.json());
    setPedidos(await pRes.json());
  } catch (err) {
    console.error('Erro ao buscar dados do perfil:', err);
  }
};


    fetchDados();
  }, [user]);

  const handleChange = (e) => {
    setFormEndereco({ ...formEndereco, [e.target.name]: e.target.value });
  };

  const buscarEndereco = async () => {
    if (formEndereco.cep.length === 8) {
      const res = await fetch(`https://viacep.com.br/ws/${formEndereco.cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setFormEndereco(prev => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        }));
      }
    }
  };

//   const handleSalvarEndereco = async (e) => {
//     e.preventDefault();
//     const { nome, sobrenome, rua, numero, bairro, cidade, estado, telefone } = formEndereco;
//     const enderecoTexto = `${nome} ${sobrenome}, ${rua}, Nº ${numero}, ${bairro}, ${cidade} - ${estado}, Tel: ${telefone}`;

//     const novo = {
//       usuarioId: user.email,
//       textoEndereco: enderecoTexto
//     };

//     try {
//       const res = await fetch('https://localhost:7252/api/Endereco', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//   usuarioId: user.email,
//   textoEndereco: enderecoTexto
// })

//       });
//       if (res.ok) {
//         setFormularioVisivel(false);
//         setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });
//         const atualizados = await fetch(`https://localhost:7252/api/Endereco/${user.email}`);
//         setEnderecos(await atualizados.json());
//       }
//     } catch (err) {
//       console.error('Erro ao salvar endereço:', err);
//     }
//   };

const handleSalvarEndereco = async (e) => {
  e.preventDefault();

  if (!user || !user.email) {
    console.error("Usuário não está logado ou 'user.email' não está disponível.");
    return;
  }

  const { nome, sobrenome, rua, numero, bairro, cidade, estado, telefone } = formEndereco;
  const enderecoTexto = `${nome} ${sobrenome}, ${rua}, Nº ${numero}, ${bairro}, ${cidade} - ${estado}, Tel: ${telefone}`;

  try {
    const res = await fetch('https://localhost:7252/api/Endereco', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
  id: null, // ← adiciona isso
  usuarioId: user.email,
  textoEndereco: enderecoTexto
})
    });

    if (!res.ok) {
      const erro = await res.text();
      console.error('Erro ao salvar endereço:', erro);
      return;
    }

    console.log('Endereço salvo com sucesso!');
    setFormularioVisivel(false);
    setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });

    const atualizados = await fetch(`https://localhost:7252/api/Endereco/${user.email}`);
    setEnderecos(await atualizados.json());
  } catch (err) {
    console.error('Erro de rede ou exceção:', err);
  }
};


  const renderDados = () => cliente && (
    <div className="dados-section">
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>CPF:</strong> {cliente.cpf}</p>
      <p><strong>Telefone:</strong> {cliente.telefone}</p>
    </div>
  );

  const renderEnderecos = () => (
    <div>
      <button className="btn-adicionar" onClick={() => setFormularioVisivel(!formularioVisivel)}>
        <Plus size={16} /> Adicionar Endereço
      </button>

      {formularioVisivel && (
        console.log('Tentando salvar endereço...'),
        <form className="form-endereco" onSubmit={handleSalvarEndereco}>
          <input type="text" name="nome" placeholder="Nome" value={formEndereco.nome} onChange={handleChange} required />
          <input type="text" name="sobrenome" placeholder="Sobrenome" value={formEndereco.sobrenome} onChange={handleChange} required />
          <input type="text" name="cep" placeholder="CEP" value={formEndereco.cep} onChange={handleChange} onBlur={buscarEndereco} required />
          <input type="text" name="rua" placeholder="Rua" value={formEndereco.rua} onChange={handleChange} required />
          <input type="text" name="numero" placeholder="Número" value={formEndereco.numero} onChange={handleChange} required />
          <input type="text" name="bairro" placeholder="Bairro" value={formEndereco.bairro} onChange={handleChange} required />
          <input type="text" name="cidade" placeholder="Cidade" value={formEndereco.cidade} onChange={handleChange} required />
          <input type="text" name="estado" placeholder="Estado" value={formEndereco.estado} onChange={handleChange} required />
          <input type="text" name="telefone" placeholder="Telefone" value={formEndereco.telefone} onChange={handleChange} required />
          <button type="submit">Salvar Endereço</button>
        </form>
      )}

      {enderecos.length ? (
        <div className="grid-enderecos">
          {enderecos.map((end, i) => (
            <article key={i} className="card">
              <p>{end.textoEndereco}</p>
            </article>
          ))}
        </div>
      ) : <p>Nenhum endereço cadastrado.</p>}
    </div>
  );

  const renderPedidos = () => (
    pedidos.length ? (
      <div className="grid-pedidos">
        {pedidos.map((p, i) => (
          <article key={i} className="card">
            <p><strong>ID:</strong> {p.id}</p>
            <p><strong>Data:</strong> {new Date(p.dataPedido).toLocaleDateString()}</p>
            <p><strong>Total:</strong> R$ {p.total.toFixed(2)}</p>
            <p><strong>Status:</strong> {p.status}</p>
          </article>
        ))}
      </div>
    ) : <p>Você ainda não fez nenhum pedido.</p>
  );

  return (
    <div className="perfil-wrapper">
      <aside className="sidebar">
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sair</span>
        </button>

        <div className="avatar">
          <User size={72} strokeWidth={1.4} />
        </div>
        <p className="cliente-nome">{cliente?.nome || 'Cliente'}</p>

        <nav className="menu-quadrados">
          <button className={`square ${abaAtiva === 'dados' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('dados')}>
            <User size={24} /> <span>Meus Dados</span>
          </button>
          <button className={`square ${abaAtiva === 'enderecos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('enderecos')}>
            <MapPin size={24} /> <span>Endereço</span>
          </button>
          <button className={`square ${abaAtiva === 'pedidos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('pedidos')}>
            <ShoppingCart size={24} /> <span>Meus Pedidos</span>
          </button>
        </nav>
      </aside>

      <section className="conteudo">
        <h2>
          {abaAtiva === 'dados' && 'Meus Dados'}
          {abaAtiva === 'enderecos' && 'Endereços Cadastrados'}
          {abaAtiva === 'pedidos' && 'Meus Pedidos'}
        </h2>

        {abaAtiva === 'dados' && renderDados()}
        {abaAtiva === 'enderecos' && renderEnderecos()}
        {abaAtiva === 'pedidos' && renderPedidos()}
      </section>
    </div>
  );
};

export default MeuPerfil;
