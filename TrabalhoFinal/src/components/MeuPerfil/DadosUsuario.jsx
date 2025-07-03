import React, { useEffect, useState } from 'react';

const DadosUsuario = () => {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('cliente'));
    if (!usuarioSalvo?.email) return;

    const fetchCliente = async () => {
      try {
        const res = await fetch(`https://localhost:7252/api/Cliente/email/${usuarioSalvo.email}`);
        if (res.ok) {
          const data = await res.json();
          setCliente(data);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do cliente:', err);
      }
    };

    fetchCliente();
  }, []);

  return cliente ? (
    <div className="dados-section">
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>CPF:</strong> {cliente.cpf}</p>
      <p><strong>Telefone:</strong> {cliente.telefone}</p>
    </div>
  ) : (
    <p>Carregando dados do usuário...</p>
  );
};

export default DadosUsuario;
