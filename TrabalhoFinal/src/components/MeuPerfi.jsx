// /* MeuPerfil.jsx */
// import React, { useEffect, useState } from 'react';
// import { User, MapPin, ShoppingCart, LogOut, Plus, Trash2, Edit } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './MeuPerfil.css';
// import { useUser } from './UserContext';

// const MeuPerfil = () => {
//   const { user, logout } = useUser();
//   const navigate = useNavigate();

//   const [cliente, setCliente] = useState(null);
//   const [enderecos, setEnderecos] = useState([]);
//   const [pedidos, setPedidos] = useState([]);
//   const [abaAtiva, setAbaAtiva] = useState('dados');
//   const [formularioVisivel, setFormularioVisivel] = useState(false);
//   const [editandoId, setEditandoId] = useState(null);
//   const [formEndereco, setFormEndereco] = useState({
//     nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: ''
//   });

//   const handleLogout = () => {
//     if (typeof logout === 'function') logout();
//     else localStorage.clear();
//     navigate('/conta');
//   };

//   const carregarEnderecos = async () => {
//     const res = await fetch(`https://localhost:7252/api/Endereco/${user.email}`);
//     setEnderecos(await res.json());
//   };

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchDados = async () => {
//       try {
//         const [cRes, pRes] = await Promise.all([
//           fetch(`https://localhost:7252/api/Cliente/email/${user.email}`),
//           fetch(`https://localhost:7252/api/Pedido/cliente/${user.email}`)
//         ]);

//         setCliente(await cRes.json());
//         setPedidos(await pRes.json());
//         carregarEnderecos();
//       } catch (err) {
//         console.error('Erro ao buscar dados do perfil:', err);
//       }
//     };

//     fetchDados();
//   }, [user]);

//   const handleChange = (e) => {
//     setFormEndereco({ ...formEndereco, [e.target.name]: e.target.value });
//   };

//   const buscarEndereco = async () => {
//     if (formEndereco.cep.length === 8) {
//       const res = await fetch(`https://viacep.com.br/ws/${formEndereco.cep}/json/`);
//       const data = await res.json();
//       if (!data.erro) {
//         setFormEndereco(prev => ({
//           ...prev,
//           rua: data.logradouro || '',
//           bairro: data.bairro || '',
//           cidade: data.localidade || '',
//           estado: data.uf || ''
//         }));
//       }
//     }
//   };

//   const handleSalvarEndereco = async (e) => {
//     e.preventDefault();
//     const { nome, sobrenome, rua, numero, bairro, cidade, estado, telefone } = formEndereco;
//     const enderecoTexto = `${nome} ${sobrenome}, ${rua}, Nº ${numero}, ${bairro}, ${cidade} - ${estado}, Tel: ${telefone}`;

//     const body = {
//       usuarioId: user.email,
//       textoEndereco: enderecoTexto
//     };

//     try {
//       const url = editandoId
//         ? `https://localhost:7252/api/Endereco/${editandoId}`
//         : 'https://localhost:7252/api/Endereco';

//       const method = editandoId ? 'PUT' : 'POST';

//       const res = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//       });

//       if (res.ok) {
//         setFormularioVisivel(false);
//         setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });
//         setEditandoId(null);
//         carregarEnderecos();
//       }
//     } catch (err) {
//       console.error('Erro ao salvar endereço:', err);
//     }
//   };

//   const handleEditar = (endereco) => {
//     const partes = endereco.textoEndereco.split(',');
//     setFormEndereco({
//       nome: partes[0]?.split(' ')[0] || '',
//       sobrenome: partes[0]?.split(' ')[1] || '',
//       rua: partes[1]?.trim() || '',
//       numero: partes[2]?.replace('Nº', '').trim() || '',
//       bairro: partes[3]?.trim() || '',
//       cidade: partes[4]?.split('-')[0]?.trim() || '',
//       estado: partes[4]?.split('-')[1]?.trim() || '',
//       telefone: partes[5]?.replace('Tel:', '').trim() || '',
//       cep: ''
//     });
//     setEditandoId(endereco.id);
//     setFormularioVisivel(true);
//   };

//   const handleExcluir = async (id) => {
//     if (!window.confirm('Deseja realmente excluir este endereço?')) return;
//     await fetch(`https://localhost:7252/api/Endereco/${id}`, { method: 'DELETE' });
//     carregarEnderecos();
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
//     <div>
//       <button className="btn-adicionar" onClick={() => {
//         setFormularioVisivel(!formularioVisivel);
//         setEditandoId(null);
//         setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });
//       }}>
//         <Plus size={16} /> {editandoId ? 'Cancelar edição' : 'Adicionar Endereço'}
//       </button>

//       {formularioVisivel && (
//         <form className="form-endereco" onSubmit={handleSalvarEndereco}>
//           <input type="text" name="nome" placeholder="Nome" value={formEndereco.nome} onChange={handleChange} required />
//           <input type="text" name="sobrenome" placeholder="Sobrenome" value={formEndereco.sobrenome} onChange={handleChange} required />
//           <input type="text" name="cep" placeholder="CEP" value={formEndereco.cep} onChange={handleChange} onBlur={buscarEndereco} required />
//           <input type="text" name="rua" placeholder="Rua" value={formEndereco.rua} onChange={handleChange} required />
//           <input type="text" name="numero" placeholder="Número" value={formEndereco.numero} onChange={handleChange} required />
//           <input type="text" name="bairro" placeholder="Bairro" value={formEndereco.bairro} onChange={handleChange} required />
//           <input type="text" name="cidade" placeholder="Cidade" value={formEndereco.cidade} onChange={handleChange} required />
//           <input type="text" name="estado" placeholder="Estado" value={formEndereco.estado} onChange={handleChange} required />
//           <input type="text" name="telefone" placeholder="Telefone" value={formEndereco.telefone} onChange={handleChange} required />
//           <button type="submit">{editandoId ? 'Atualizar' : 'Salvar Endereço'}</button>
//         </form>
//       )}

//       {enderecos.length ? (
//         <div className="grid-enderecos">
//           {enderecos.map((end, i) => (
//             <article key={i} className="card">
//               <p>{end.textoEndereco}</p>
//               <div className="botoes-card">
//                 <button onClick={() => handleEditar(end)}><Edit size={16} /></button>
//                 <button onClick={() => handleExcluir(end.id)}><Trash2 size={16} /></button>
//               </div>
//             </article>
//           ))}
//         </div>
//       ) : <p>Nenhum endereço cadastrado.</p>}
//     </div>
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
//           <LogOut size={18} /> <span>Sair</span>
//         </button>

//         <div className="avatar">
//           <User size={72} strokeWidth={1.4} />
//         </div>
//         <p className="cliente-nome">{cliente?.nome || 'Cliente'}</p>

//         <nav className="menu-quadrados">
//           <button className={`square ${abaAtiva === 'dados' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('dados')}>
//             <User size={24} /> <span>Meus Dados</span>
//           </button>
//           <button className={`square ${abaAtiva === 'enderecos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('enderecos')}>
//             <MapPin size={24} /> <span>Endereço</span>
//           </button>
//           <button className={`square ${abaAtiva === 'pedidos' ? 'ativo' : ''}`} onClick={() => setAbaAtiva('pedidos')}>
//             <ShoppingCart size={24} /> <span>Meus Pedidos</span>
//           </button>
//         </nav>
//       </aside>

//       <section className="conteudo">
//         <h2>
//           {abaAtiva === 'dados' && 'Meus Dados'}
//           {abaAtiva === 'enderecos' && 'Endereços Cadastrados'}
//           {abaAtiva === 'pedidos' && 'Meus Pedidos'}
//         </h2>

//         {abaAtiva === 'dados' && renderDados()}
//         {abaAtiva === 'enderecos' && renderEnderecos()}
//         {abaAtiva === 'pedidos' && renderPedidos()}
//       </section>
//     </div>
//   );
// };

// export default MeuPerfil;


import React, { useEffect, useState } from 'react';
import { User, MapPin, ShoppingCart, LogOut, Plus, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MeuPerfil.css';
import { useUser } from './UserContext';

const MeuPerfil = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('dados');
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formEndereco, setFormEndereco] = useState({
    nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: ''
  });

  const handleLogout = () => {
    if (typeof logout === 'function') logout();
    else localStorage.clear();
    navigate('/conta');
  };

 const carregarEnderecos = async () => {
  if (!user?.email) return;
  try {
    const res = await fetch(`https://localhost:7252/api/Endereco/cliente/${user.email}`);
    if (res.ok) {
      const lista = await res.json();
      setEnderecos(lista);
    }
  } catch (err) {
    console.error('Erro ao carregar endereços:', err);
  }
};

  useEffect(() => {
    if (!user?.email) return;

    const fetchDados = async () => {
      try {
        const [cRes, pRes] = await Promise.all([
          fetch(`https://localhost:7252/api/Cliente/email/${user.email}`),
          fetch(`https://localhost:7252/api/Pedido/cliente/${user.email}`)
        ]);

        setCliente(await cRes.json());
        setPedidos(await pRes.json());
        carregarEnderecos();
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

  const handleSalvarEndereco = async (e) => {
    e.preventDefault();
    const { nome, sobrenome, rua, numero, bairro, cidade, estado, telefone } = formEndereco;
    const enderecoTexto = `${nome} ${sobrenome}, ${rua}, Nº ${numero}, ${bairro}, ${cidade} - ${estado}, Tel: ${telefone}`;

    const body = {
      usuarioId: user.email,
      textoEndereco: enderecoTexto
    };

    try {
      const url = editandoId
        ? `https://localhost:7252/api/Endereco/${editandoId}`
        : 'https://localhost:7252/api/Endereco';

      const method = editandoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setFormularioVisivel(false);
        setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });
        setEditandoId(null);
        carregarEnderecos();
      }
    } catch (err) {
      console.error('Erro ao salvar endereço:', err);
    }
  };

  const handleEditar = (endereco) => {
    if (!window.confirm('Deseja editar este endereço?')) return;

    const partes = endereco.textoEndereco.split(',');
    setFormEndereco({
      nome: partes[0]?.split(' ')[0] || '',
      sobrenome: partes[0]?.split(' ')[1] || '',
      rua: partes[1]?.trim() || '',
      numero: partes[2]?.replace('Nº', '').trim() || '',
      bairro: partes[3]?.trim() || '',
      cidade: partes[4]?.split('-')[0]?.trim() || '',
      estado: partes[4]?.split('-')[1]?.trim() || '',
      telefone: partes[5]?.replace('Tel:', '').trim() || '',
      cep: ''
    });
    setEditandoId(endereco.id);
    setFormularioVisivel(true);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Deseja realmente excluir este endereço?')) return;
    await fetch(`https://localhost:7252/api/Endereco/${id}`, { method: 'DELETE' });
    carregarEnderecos();
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
      <button className="btn-adicionar" onClick={() => {
        setFormularioVisivel(!formularioVisivel);
        setEditandoId(null);
        setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });
      }}>
        <Plus size={16} /> {editandoId ? 'Cancelar edição' : 'Adicionar Endereço'}
      </button>

      {formularioVisivel && (
        <form className="form-endereco" onSubmit={handleSalvarEndereco}>
          <input type="text" name="nome" placeholder="Nome" value={formEndereco.nome} onChange={handleChange} required />
          <input type="text" name="sobrenome" placeholder="Sobrenome" value={formEndereco.sobrenome} onChange={handleChange} required />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={formEndereco.cep}
            onChange={handleChange}
            onBlur={buscarEndereco}
            required={!editandoId}
          />
          <input type="text" name="rua" placeholder="Rua" value={formEndereco.rua} onChange={handleChange} required />
          <input type="text" name="numero" placeholder="Número" value={formEndereco.numero} onChange={handleChange} required />
          <input type="text" name="bairro" placeholder="Bairro" value={formEndereco.bairro} onChange={handleChange} required />
          <input type="text" name="cidade" placeholder="Cidade" value={formEndereco.cidade} onChange={handleChange} required />
          <input type="text" name="estado" placeholder="Estado" value={formEndereco.estado} onChange={handleChange} required />
          <input type="text" name="telefone" placeholder="Telefone" value={formEndereco.telefone} onChange={handleChange} required />
          <button type="submit">{editandoId ? 'Atualizar' : 'Salvar Endereço'}</button>
        </form>
      )}

      {enderecos.length ? (
        <div className="grid-enderecos">
          {enderecos.map((end, i) => (
            <article key={i} className="card">
              <p>{end.textoEndereco}</p>
              <div className="botoes-card">
                <button onClick={() => handleEditar(end)}><Edit size={16} /></button>
                <button onClick={() => handleExcluir(end.id)}><Trash2 size={16} /></button>
              </div>
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
          <LogOut size={18} /> <span>Sair</span>
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

