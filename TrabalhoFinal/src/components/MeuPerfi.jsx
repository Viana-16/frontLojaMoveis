/* MeuPerfil.jsx */
import React, { useEffect, useState } from 'react';
import { User, MapPin, ShoppingCart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MeuPerfil.css';
import { useUser } from './UserContext';

const MeuPerfil = () => {
  // Pega o usuário (e logout, se existir) no contexto
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [cliente, setCliente]   = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [pedidos, setPedidos]     = useState([]);
  const [abaAtiva, setAbaAtiva]   = useState('dados');   // aba inicial

  /* ---------- logout ---------- */
  const handleLogout = () => {
    // Se o contexto já fornece logout, use-o
    if (typeof logout === 'function') {
      logout();
    } else {
      // fallback: limpa tudo que for relevante
      localStorage.clear();
    }
    navigate('/login'); // redireciona para a tela de login
  };

  /* ---------- chamadas à API ---------- */
  useEffect(() => {
    if (!user?.email) return;

    const fetchDados = async () => {
      try {
        const [cRes, eRes, pRes] = await Promise.all([
          fetch(`https://localhost:7252/api/Cliente/email/${user.email}`, { credentials: 'include' }),
          fetch(`https://localhost:7252/api/Endereco/cliente/${user.email}`, { credentials: 'include' }),
          fetch(`https://localhost:7252/api/Pedido/cliente/${user.email}`,   { credentials: 'include' })
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

  /* ---------- renders ---------- */
  const renderDados = () => cliente && (
    <div className="dados-section">
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>CPF:</strong> {cliente.cpf}</p>
      <p><strong>Telefone:</strong> {cliente.telefone}</p>
    </div>
  );

  const renderEnderecos = () => (
    enderecos.length ? (
      <div className="grid-enderecos">
        {enderecos.map((end, i) => (
          <article key={i} className="card">
            <p><strong>Rua:</strong> {end.rua}</p>
            <p><strong>Número:</strong> {end.numero}</p>
            <p><strong>Cidade:</strong> {end.cidade}</p>
            <p><strong>Estado:</strong> {end.estado}</p>
          </article>
        ))}
      </div>
    ) : <p>Nenhum endereço cadastrado.</p>
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
      {/* ----- COLUNA ESQUERDA ----- */}
      <aside className="sidebar">
        {/* botão de logout */}
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sair</span>
        </button>

        {/* avatar + nome */}
        <div className="avatar">
          <User size={72} strokeWidth={1.4} />
        </div>
        <p className="cliente-nome">{cliente?.nome || 'Cliente'}</p>

        {/* navegação em quadrados */}
        <nav className="menu-quadrados">
          <button
            className={`square ${abaAtiva === 'dados' ? 'ativo' : ''}`}
            onClick={() => setAbaAtiva('dados')}
          >
            <User size={24} />
            <span>Meus Dados</span>
          </button>

          <button
            className={`square ${abaAtiva === 'enderecos' ? 'ativo' : ''}`}
            onClick={() => setAbaAtiva('enderecos')}
          >
            <MapPin size={24} />
            <span>Endereço</span>
          </button>

          <button
            className={`square ${abaAtiva === 'pedidos' ? 'ativo' : ''}`}
            onClick={() => setAbaAtiva('pedidos')}
          >
            <ShoppingCart size={24} />
            <span>Meus Pedidos</span>
          </button>
        </nav>
      </aside>

      {/* ----- ÁREA DE CONTEÚDO ----- */}
      <section className="conteudo">
        <h2>
          {abaAtiva === 'dados'     && 'Meus Dados'}
          {abaAtiva === 'enderecos' && 'Endereços Cadastrados'}
          {abaAtiva === 'pedidos'   && 'Meus Pedidos'}
        </h2>

        {abaAtiva === 'dados'     && renderDados()}
        {abaAtiva === 'enderecos' && renderEnderecos()}
        {abaAtiva === 'pedidos'   && renderPedidos()}
      </section>
    </div>
  );
};

export default MeuPerfil;
