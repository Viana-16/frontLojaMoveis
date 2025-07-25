// import React, { useEffect, useState } from 'react';
// import { User, Mail, CreditCard, Phone } from 'lucide-react';
// import './DadosUsuario.css';

// const DadosUsuario = () => {
//   const [cliente, setCliente] = useState(null);
//   const [carregando, setCarregando] = useState(true);

//   useEffect(() => {
//     const usuarioSalvo = JSON.parse(localStorage.getItem('cliente'));
//     if (!usuarioSalvo?.email) {
//       setCarregando(false);
//       return;
//     }

//     const fetchCliente = async () => {
//       try {
//         const res = await fetch(`https://localhost:7252/api/Cliente/email/${usuarioSalvo.email}`);
//         if (res.ok) {
//           const data = await res.json();
//           setCliente(data);
//         }
//       } catch (err) {
//         console.error('Erro ao buscar dados do cliente:', err);
//       } finally {
//         setCarregando(false);
//       }
//     };

//     fetchCliente();
//   }, []);

//   const formatarCPF = (cpf) => {
//     if (!cpf) return '';
//     return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
//   };

//   const formatarTelefone = (telefone) => {
//     if (!telefone) return '';
//     // Formatação para (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
//     return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
//   };

//   return (
//     <div className="dados-usuario-container">
//       {carregando ? (
//         <div className="carregando-dados">
//           <div className="spinner"></div>
//           <p>Carregando seus dados...</p>
//         </div>
//       ) : cliente ? (
//         <>
//           <h3 className="titulo-dados">Informações Pessoais</h3>
//           <div className="dados-grid">
//             <div className="dado-item">
//               <div className="icone-dado">
//                 <User size={20} />
//               </div>
//               <div>
//                 <label>Nome completo</label>
//                 <p>{cliente.nome}</p>
//               </div>
//             </div>

//             <div className="dado-item">
//               <div className="icone-dado">
//                 <Mail size={20} />
//               </div>
//               <div>
//                 <label>E-mail</label>
//                 <p>{cliente.email}</p>
//               </div>
//             </div>

//             <div className="dado-item">
//               <div className="icone-dado">
//                 <CreditCard size={20} />
//               </div>
//               <div>
//                 <label>CPF</label>
//                 <p>{formatarCPF(cliente.cpf)}</p>
//               </div>
//             </div>

//             <div className="dado-item">
//               <div className="icone-dado">
//                 <Phone size={20} />
//               </div>
//               <div>
//                 <label>Telefone</label>
//                 <p>{formatarTelefone(cliente.telefone)}</p>
//               </div>
//             </div>
//           </div>

//           <button className="btn-editar">
//             Editar informações
//           </button>
//         </>
//       ) : (
//         <div className="sem-dados">
//           <p>Não foi possível carregar seus dados.</p>
//           <button className="btn-tentar-novamente">
//             Tentar novamente
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DadosUsuario;


import React, { useEffect, useState } from 'react';
import { User, Mail, CreditCard, Phone, Save, X, Edit3 } from 'lucide-react';
import './DadosUsuario.css';

const DadosUsuario = () => {
  const [cliente, setCliente] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ nome: '', telefone: '' });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('cliente'));
    if (!usuarioSalvo?.email) {
      setCarregando(false);
      return;
    }

    const fetchCliente = async () => {
      try {
        const res = await fetch(`https://localhost:7252/api/Cliente/email/${usuarioSalvo.email}`);
        if (res.ok) {
          const data = await res.json();
          setCliente(data);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do cliente:', err);
      } finally {
        setCarregando(false);
      }
    };

    fetchCliente();
  }, []);

  const formatarCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarTelefoneView = (telefone) => {
    if (!telefone) return '';
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  };

  const formatarTelefoneInput = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  };

  const handleEditar = () => {
    setErro('');
    setForm({
      nome: cliente?.nome || '',
      telefone: cliente?.telefone || '',
    });
    setEditando(true);
  };

  const handleCancelar = () => {
    setErro('');
    setEditando(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      setForm((prev) => ({ ...prev, telefone: formatarTelefoneInput(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSalvar = async () => {
    if (!cliente?.id) return;
    if (!form.nome.trim() || !form.telefone.trim()) {
      setErro('Nome e telefone são obrigatórios.');
      return;
    }

    setErro('');
    setSalvando(true);

    try {
      // Remove máscara para salvar “limpo” no banco (opcional)
      const telefoneLimpo = form.telefone.replace(/\D/g, '');

      const res = await fetch(`https://localhost:7252/api/Cliente/${cliente.id}/basico`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          telefone: telefoneLimpo
        })
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Erro ao salvar');
      }

      const atualizado = await res.json();
      setCliente(atualizado);
      // se você guarda o cliente também no localStorage, atualize-o:
      const salvo = JSON.parse(localStorage.getItem('cliente')) || {};
      salvo.nome = atualizado.nome;
      salvo.telefone = atualizado.telefone;
      localStorage.setItem('cliente', JSON.stringify(salvo));

      setEditando(false);
    } catch (err) {
      console.error(err);
      setErro(typeof err.message === 'string' ? err.message : 'Erro ao salvar.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="dados-usuario-container">
      {carregando ? (
        <div className="carregando-dados">
          <div className="spinner"></div>
          <p>Carregando seus dados...</p>
        </div>
      ) : cliente ? (
        <>
          <h3 className="titulo-dados">Informações Pessoais</h3>

          {!editando ? (
            <>
              <div className="dados-grid">
                <div className="dado-item">
                  <div className="icone-dado">
                    <User size={20} />
                  </div>
                  <div>
                    <label>Nome completo</label>
                    <p>{cliente.nome}</p>
                  </div>
                </div>

                <div className="dado-item">
                  <div className="icone-dado">
                    <Mail size={20} />
                  </div>
                  <div>
                    <label>E-mail</label>
                    <p>{cliente.email}</p>
                  </div>
                </div>

                <div className="dado-item">
                  <div className="icone-dado">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <label>CPF</label>
                    <p>{formatarCPF(cliente.cpf)}</p>
                  </div>
                </div>

                <div className="dado-item">
                  <div className="icone-dado">
                    <Phone size={20} />
                  </div>
                  <div>
                    <label>Telefone</label>
                    <p>{formatarTelefoneView(cliente.telefone)}</p>
                  </div>
                </div>
              </div>

              <button className="btn-editar" onClick={handleEditar}>
                <Edit3 size={16} /> Editar informações
              </button>
            </>
          ) : (
            <>
              <div className="form-edicao">
                <div className="campo">
                  <label>Nome completo</label>
                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                  />
                </div>

                <div className="campo">
                  <label>Telefone</label>
                  <input
                    type="text"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </div>

                {erro && <p className="erro">{erro}</p>}

                <div className="botoes-edicao">
                  <button className="btn-cancelar" type="button" onClick={handleCancelar} disabled={salvando}>
                    <X size={16} /> Cancelar
                  </button>
                  <button className="btn-salvar" type="button" onClick={handleSalvar} disabled={salvando}>
                    <Save size={16} /> {salvando ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="sem-dados">
          <p>Não foi possível carregar seus dados.</p>
          <button className="btn-tentar-novamente" onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default DadosUsuario;
