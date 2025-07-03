// import React from 'react';
// import { Plus, Edit, Trash2 } from 'lucide-react';

// const EnderecoUsuario = ({
//   enderecos = [], // <- correção aqui
//   formularioVisivel,
//   formEndereco,
//   editandoId,
//   handleChange,
//   buscarEndereco,
//   handleSalvarEndereco,
//   setFormularioVisivel,
//   setEditandoId,
//   setFormEndereco,
//   handleEditar,
//   handleExcluir
// }) => {
//   return (
//     <div>
//       {enderecos.length > 0 ? (
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
//       ) : (
//         <p>Nenhum endereço cadastrado.</p>
//       )}

//       <button className="btn-adicionar" onClick={() => {
//         setFormularioVisivel(true);
//         setEditandoId(null);
//         setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });
//       }}>
//         <Plus size={16} /> {editandoId ? 'Cancelar edição' : 'Adicionar Endereço'}
//       </button>

//       {formularioVisivel && (
//         <form className="form-endereco" onSubmit={handleSalvarEndereco}>
//           <input type="text" name="nome" placeholder="Nome" value={formEndereco.nome} onChange={handleChange} required />
//           <input type="text" name="sobrenome" placeholder="Sobrenome" value={formEndereco.sobrenome} onChange={handleChange} required />
//           <input
//             type="text"
//             name="cep"
//             placeholder="CEP"
//             value={formEndereco.cep}
//             onChange={handleChange}
//             onBlur={buscarEndereco}
//             required={!editandoId}
//           />
//           <input type="text" name="rua" placeholder="Rua" value={formEndereco.rua} onChange={handleChange} required />
//           <input type="text" name="numero" placeholder="Número" value={formEndereco.numero} onChange={handleChange} required />
//           <input type="text" name="bairro" placeholder="Bairro" value={formEndereco.bairro} onChange={handleChange} required />
//           <input type="text" name="cidade" placeholder="Cidade" value={formEndereco.cidade} onChange={handleChange} required />
//           <input type="text" name="estado" placeholder="Estado" value={formEndereco.estado} onChange={handleChange} required />
//           <input type="text" name="telefone" placeholder="Telefone" value={formEndereco.telefone} onChange={handleChange} required />
//           <button type="submit">{editandoId ? 'Atualizar' : 'Salvar Endereço'}</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EnderecoUsuario;



import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useUser } from '../UserContext';

const EnderecosUsuario = () => {
  const { user } = useUser();
  const [enderecos, setEnderecos] = useState([]);
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formEndereco, setFormEndereco] = useState({
    nome: '', sobrenome: '', cep: '', rua: '', numero: '',
    bairro: '', cidade: '', estado: '', telefone: ''
  });

  const carregarEnderecos = async () => {
    const email = user?.email || JSON.parse(localStorage.getItem('cliente'))?.email;
    if (!email) return;

    try {
      const res = await fetch(`https://localhost:7252/api/Endereco/${email}`);
      const dados = await res.json();
      setEnderecos(Array.isArray(dados) ? dados : []);
    } catch (err) {
      console.error('Erro ao carregar endereços:', err);
    }
  };

  useEffect(() => {
    carregarEnderecos();
  }, []);

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
      usuarioId: user?.email,
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
    if (!window.confirm('Deseja excluir este endereço?')) return;
    await fetch(`https://localhost:7252/api/Endereco/${id}`, { method: 'DELETE' });
    carregarEnderecos();
  };

  return (
    <div>
      {enderecos.length > 0 ? (
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
      ) : (
        <p>Nenhum endereço cadastrado.</p>
      )}

      <button className="btn-adicionar" onClick={() => {
        setFormularioVisivel(true);
        setEditandoId(null);
        setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '' });
      }}>
        <Plus size={16} /> {editandoId ? 'Cancelar edição' : 'Adicionar Endereço'}
      </button>

      {formularioVisivel && (
        <form className="form-endereco" onSubmit={handleSalvarEndereco}>
          <input type="text" name="nome" placeholder="Nome" value={formEndereco.nome} onChange={handleChange} required />
          <input type="text" name="sobrenome" placeholder="Sobrenome" value={formEndereco.sobrenome} onChange={handleChange} required />
          <input type="text" name="cep" placeholder="CEP" value={formEndereco.cep} onChange={handleChange} onBlur={buscarEndereco} required={!editandoId} />
          <input type="text" name="rua" placeholder="Rua" value={formEndereco.rua} onChange={handleChange} required />
          <input type="text" name="numero" placeholder="Número" value={formEndereco.numero} onChange={handleChange} required />
          <input type="text" name="bairro" placeholder="Bairro" value={formEndereco.bairro} onChange={handleChange} required />
          <input type="text" name="cidade" placeholder="Cidade" value={formEndereco.cidade} onChange={handleChange} required />
          <input type="text" name="estado" placeholder="Estado" value={formEndereco.estado} onChange={handleChange} required />
          <input type="text" name="telefone" placeholder="Telefone" value={formEndereco.telefone} onChange={handleChange} required />
          <button type="submit">{editandoId ? 'Atualizar' : 'Salvar Endereço'}</button>
        </form>
      )}
    </div>
  );
};

export default EnderecosUsuario;
