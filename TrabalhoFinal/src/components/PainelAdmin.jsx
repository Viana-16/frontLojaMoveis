import React from 'react';
import { Link } from 'react-router-dom';

const PainelAdmin = () => {
  const categorias = [
    { nome: 'Lançamentos', path: 'lancamentos' },
    { nome: 'Promoções', path: 'promocoes' },
    { nome: 'Guarda-roupa', path: 'guarda-roupa' },
    { nome: 'Sala de Estar', path: 'sala-estar' },
    { nome: 'Sofás', path: 'sofas' },
    { nome: 'Cozinhas', path: 'cozinhas' },
    { nome: 'Cadeiras', path: 'cadeiras' },
    { nome: 'Mesas', path: 'mesas' },
    { nome: 'Painéis', path: 'paineis' },
    { nome: 'Estantes', path: 'estantes' },
    { nome: 'Camas', path: 'camas' },
    { nome: 'Lavanderia', path: 'lavanderia' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((cat) => (
          <Link
            key={cat.path}
            to={`/admin/cadastrar/${cat.path}`}
            className="block p-4 bg-blue-500 text-white text-center rounded-lg shadow hover:bg-blue-600 transition"
          >
            Cadastrar em {cat.nome}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PainelAdmin;
