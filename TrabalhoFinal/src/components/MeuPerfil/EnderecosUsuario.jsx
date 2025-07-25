// import React, { useEffect, useState } from 'react';
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import { useUser } from '../UserContext';

// const EnderecosUsuario = () => {
//   const { user } = useUser();
//   const [enderecos, setEnderecos] = useState([]);
//   const [formularioVisivel, setFormularioVisivel] = useState(false);
//   const [editandoId, setEditandoId] = useState(null);
//   const [formEndereco, setFormEndereco] = useState({
//     nome: '', sobrenome: '', cep: '', rua: '', numero: '',
//     bairro: '', cidade: '', estado: '', telefone: ''
//   });

//   const carregarEnderecos = async () => {
//     const email = user?.email || JSON.parse(localStorage.getItem('cliente'))?.email;
//     if (!email) return;

//     try {
//       const res = await fetch(`https://localhost:7252/api/Endereco/${email}`);
//       const dados = await res.json();
//       setEnderecos(Array.isArray(dados) ? dados : []);
//     } catch (err) {
//       console.error('Erro ao carregar endereços:', err);
//     }
//   };

//   useEffect(() => {
//     carregarEnderecos();
//   }, []);

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
//       usuarioId: user?.email,
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
//     if (!window.confirm('Deseja excluir este endereço?')) return;
//     await fetch(`https://localhost:7252/api/Endereco/${id}`, { method: 'DELETE' });
//     carregarEnderecos();
//   };

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
//           <input type="text" name="cep" placeholder="CEP" value={formEndereco.cep} onChange={handleChange} onBlur={buscarEndereco} required={!editandoId} />
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

// export default EnderecosUsuario;


import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin, ChevronRight } from 'lucide-react';
import { useUser } from '../UserContext';
import './EnderecosUsuario.css';

const EnderecosUsuario = () => {
  const { user } = useUser();
  const [enderecos, setEnderecos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formEndereco, setFormEndereco] = useState({
    nome: '', sobrenome: '', cep: '', rua: '', numero: '',
    bairro: '', cidade: '', estado: '', telefone: '', complemento: ''
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
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarEnderecos();
  }, [user]);

  const handleChange = (e) => {
    setFormEndereco({ ...formEndereco, [e.target.name]: e.target.value });
  };

  const buscarEndereco = async () => {
    if (formEndereco.cep.length === 8) {
      try {
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
      } catch (err) {
        console.error('Erro ao buscar CEP:', err);
      }
    }
  };

  const handleSalvarEndereco = async (e) => {
    e.preventDefault();
    const { nome, sobrenome, rua, numero, bairro, cidade, estado, telefone, complemento } = formEndereco;
    const enderecoTexto = `${nome} ${sobrenome}, ${rua}, Nº ${numero}${complemento ? ` (${complemento})` : ''}, ${bairro}, ${cidade} - ${estado}, Tel: ${telefone}`;

    const body = {
      usuarioId: user?.email || JSON.parse(localStorage.getItem('cliente'))?.email,
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
        setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '', complemento: '' });
        setEditandoId(null);
        await carregarEnderecos();
      }
    } catch (err) {
      console.error('Erro ao salvar endereço:', err);
    }
  };

  const handleEditar = (endereco) => {
    const partes = endereco.textoEndereco.split(',');
    const complementoMatch = partes[2]?.match(/\(([^)]+)\)/);
    
    setFormEndereco({
      nome: partes[0]?.split(' ')[0] || '',
      sobrenome: partes[0]?.split(' ').slice(1).join(' ') || '',
      rua: partes[1]?.trim() || '',
      numero: partes[2]?.replace(/Nº|\s|\([^)]*\)/g, '').trim() || '',
      complemento: complementoMatch ? complementoMatch[1] : '',
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
    if (!window.confirm('Tem certeza que deseja excluir este endereço?')) return;
    try {
      await fetch(`https://localhost:7252/api/Endereco/${id}`, { method: 'DELETE' });
      await carregarEnderecos();
    } catch (err) {
      console.error('Erro ao excluir endereço:', err);
    }
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return '';
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  };

  return (
    <div className="enderecos-container">
      <div className="enderecos-header">
        <h2>Meus Endereços</h2>
        <button 
          className="btn-adicionar"
          onClick={() => {
            setFormularioVisivel(!formularioVisivel);
            if (formularioVisivel) {
              setEditandoId(null);
              setFormEndereco({ nome: '', sobrenome: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', telefone: '', complemento: '' });
            }
          }}
        >
          <Plus size={18} />
          {formularioVisivel ? 'Cancelar' : 'Novo Endereço'}
        </button>
      </div>

      {carregando ? (
        <div className="carregando">
          <div className="spinner"></div>
          <p>Carregando seus endereços...</p>
        </div>
      ) : (
        <>
          {formularioVisivel && (
            <form className="form-endereco" onSubmit={handleSalvarEndereco}>
              <h3>{editandoId ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome</label>
                  <input type="text" name="nome" value={formEndereco.nome} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Sobrenome</label>
                  <input type="text" name="sobrenome" value={formEndereco.sobrenome} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>CEP</label>
                  <input 
                    type="text" 
                    name="cep" 
                    value={formEndereco.cep} 
                    onChange={handleChange} 
                    onBlur={buscarEndereco} 
                    required={!editandoId}
                    maxLength="8"
                  />
                </div>
                
                <div className="form-group">
                  <label>Rua</label>
                  <input type="text" name="rua" value={formEndereco.rua} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Número</label>
                  <input type="text" name="numero" value={formEndereco.numero} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Complemento (opcional)</label>
                  <input type="text" name="complemento" value={formEndereco.complemento} onChange={handleChange} />
                </div>
                
                <div className="form-group">
                  <label>Bairro</label>
                  <input type="text" name="bairro" value={formEndereco.bairro} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Cidade</label>
                  <input type="text" name="cidade" value={formEndereco.cidade} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Estado</label>
                  <input type="text" name="estado" value={formEndereco.estado} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                  <label>Telefone</label>
                  <input 
                    type="text" 
                    name="telefone" 
                    value={formEndereco.telefone} 
                    onChange={handleChange} 
                    required 
                    maxLength="11"
                  />
                </div>
              </div>

              <div className="form-botoes">
                <button type="submit" className="btn-salvar">
                  {editandoId ? 'Atualizar Endereço' : 'Salvar Endereço'}
                </button>
                <button 
                  type="button" 
                  className="btn-cancelar"
                  onClick={() => {
                    setFormularioVisivel(false);
                    setEditandoId(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {enderecos.length > 0 ? (
  <div className="lista-enderecos">
    {enderecos.map((endereco, index) => (
      <div key={index} className="card-endereco">
        <div className="endereco-icone">
          <MapPin size={20} />
        </div>
        <div className="endereco-info">
          <h4>Endereço {index + 1}</h4>
          <p>{endereco.textoEndereco.split(', Tel:')[0]}</p>
          {endereco.textoEndereco.includes('Tel:') && (
            <p className="endereco-telefone">
              {formatarTelefone(endereco.textoEndereco.split('Tel:')[1])}
            </p>
          )}
        </div>
        <div className="endereco-acoes">
          <button 
            className="btn-editar"
            onClick={() => handleEditar(endereco)}
            aria-label="Editar endereço"
            title="Editar endereço"
          >
            <Edit size={16} />
            <span>Editar</span>
          </button>
          <button 
            className="btn-excluir"
            onClick={() => handleExcluir(endereco.id)}
            aria-label="Excluir endereço"
            title="Excluir endereço"
          >
            <Trash2 size={16} />
            <span>Excluir</span>
          </button>
        </div>
      </div>
    ))}
  </div>
) : !formularioVisivel && (
            <div className="sem-enderecos">
              <MapPin size={48} className="icone-vazio" />
              <p>Você ainda não tem endereços cadastrados</p>
              <button 
                className="btn-adicionar-vazio"
                onClick={() => setFormularioVisivel(true)}
              >
                <Plus size={18} />
                Adicionar primeiro endereço
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnderecosUsuario;