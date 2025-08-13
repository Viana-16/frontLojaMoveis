import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { useUser } from '../UserContext';
import './EnderecosUsuario.css';

const EnderecosUsuario = () => {
  const { user } = useUser();
  const [enderecos, setEnderecos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  // // const [enderecoAtivo, setEnderecoAtivo] = useState(() => {
  // //   const salvo = localStorage.getItem('enderecoAtivo');
  // //   return salvo ? JSON.parse(salvo) : null;
  // // });
  // Estado inicial: busca pelo endereço ativo do usuário logado
const [enderecoAtivo, setEnderecoAtivo] = useState(() => {
  const email = JSON.parse(localStorage.getItem('cliente'))?.email;
  if (!email) return null;
  const salvo = localStorage.getItem(`enderecoAtivo_${email}`);
  return salvo ? JSON.parse(salvo) : null;
});

  const [formEndereco, setFormEndereco] = useState({
    nome: '', sobrenome: '', cep: '', rua: '', numero: '',
    bairro: '', cidade: '', estado: '', telefone: '', complemento: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [enderecoParaExcluir, setEnderecoParaExcluir] = useState(null);

  const carregarEnderecos = async () => {
    const email = user?.email || JSON.parse(localStorage.getItem('cliente'))?.email;
    if (!email) return;

    try {
      const res = await fetch(`https://lojamoveis.onrender.com/api/Endereco/${email}`);
      const dados = await res.json();
      setEnderecos(Array.isArray(dados) ? dados : []);
    } catch (err) {
      console.error('Erro ao carregar endereços:', err);
    } finally {
      setCarregando(false);
    }
  };

  // useEffect(() => {
  //   carregarEnderecos();
  // }, [user]);

  useEffect(() => {
  carregarEnderecos();

  const email = user?.email || JSON.parse(localStorage.getItem('cliente'))?.email;
  const salvo = email ? localStorage.getItem(`enderecoAtivo_${email}`) : null;
  setEnderecoAtivo(salvo ? JSON.parse(salvo) : null);
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
        ? `https://lojamoveis.onrender.com/api/Endereco/${editandoId}`
        : 'https://lojamoveis.onrender.com/api/Endereco';
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

  const handleExcluir = (id) => {
    setEnderecoParaExcluir(id);
    setShowModal(true);
  };

  const confirmarExclusao = async () => {
    try {
      await fetch(`https://lojamoveis.onrender.com/api/Endereco/${enderecoParaExcluir}`, { method: 'DELETE' });
      await carregarEnderecos();
      setShowModal(false);
    } catch (err) {
      console.error('Erro ao excluir endereço:', err);
    }
  };

  const cancelarExclusao = () => {
    setShowModal(false);
    setEnderecoParaExcluir(null);
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
                <div key={endereco.id} className="endereco-wrapper-externo">
                  <div className="endereco-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={endereco.id === enderecoAtivo}
                        // onChange={() => {
                        //   const novoId = endereco.id === enderecoAtivo ? null : endereco.id;
                        //   setEnderecoAtivo(novoId);
                        //   if (novoId) {
                        //     localStorage.setItem('enderecoAtivo', JSON.stringify(novoId));
                        //   } else {
                        //     localStorage.removeItem('enderecoAtivo');
                        //   }
                        // }}

                        onChange={() => {
  const email = user?.email || JSON.parse(localStorage.getItem('cliente'))?.email;
  const novoId = endereco.id === enderecoAtivo ? null : endereco.id;
  setEnderecoAtivo(novoId);

  if (novoId) {
    localStorage.setItem(`enderecoAtivo_${email}`, JSON.stringify(novoId));
  } else {
    localStorage.removeItem(`enderecoAtivo_${email}`);
  }
}}
                      />
                      Usar como endereço ativo
                    </label>
                  </div>

                  <div className={`card-endereco ${endereco.id === enderecoAtivo ? 'ativo' : ''}`}>
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
                      <button className="btn-editar" onClick={() => handleEditar(endereco)}>
                        <Edit size={16} />
                        <span>Editar</span>
                      </button>
                      <button className="btn-excluir" onClick={() => handleExcluir(endereco.id)}>
                        <Trash2 size={16} />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !formularioVisivel && (
            <div className="sem-enderecos">
              <MapPin size={48} className="icone-vazio" />
              <p>Você ainda não tem endereços cadastrados</p>
              <button className="btn-adicionar-vazio" onClick={() => setFormularioVisivel(true)}>
                <Plus size={18} />
                Adicionar primeiro endereço
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirmar Exclusão</h3>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja excluir este endereço?</p>
              <div className="modal-buttons">
                <button className="btn-cancelar" onClick={cancelarExclusao}>
                  Cancelar
                </button>
                <button className="btn-confirmar" onClick={confirmarExclusao}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnderecosUsuario;
