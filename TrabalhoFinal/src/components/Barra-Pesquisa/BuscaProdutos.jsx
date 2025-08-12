import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BuscaProdutos = () => {
  const location = useLocation();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pega o parâmetro search da URL
  const params = new URLSearchParams(location.search);
  const termoBusca = params.get('search') || '';

  useEffect(() => {
    if (!termoBusca) {
      setProdutos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/produto/buscar?search=${encodeURIComponent(termoBusca)}`)
      .then(res => res.json())
      .then(data => {
  console.log('Dados da busca:', data);
  setProdutos(data);
  setLoading(false);
})
      .catch(() => {
        setProdutos([]);
        setLoading(false);
      });
  }, [termoBusca]);

  return (
    <div className="busca-produtos-container">
      <h2>Resultados para "{termoBusca}"</h2>

      {loading && <p>Carregando...</p>}

      {!loading && produtos.length === 0 && <p>Nenhum produto encontrado.</p>}

      <div className="lista-produtos">
        {produtos.map(produto => (
          <div key={produto.id} className="produto-card">
            <img src={produto.imagemUrl} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <p><strong>R$ {produto.preco?.toFixed(2)}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuscaProdutos;
