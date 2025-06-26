import React, { useEffect, useState } from 'react';
import { useSearch } from './SearchContext';

const Buscar = () => {
  const { termoBusca } = useSearch();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7252/api/Produto')
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter((p) =>
          p.nome.toLowerCase().includes(termoBusca) ||
          p.categoria.toLowerCase().includes(termoBusca)
        );
        setProdutos(filtrados);
      });
  }, [termoBusca]);

  return (
    <div>
      <h2>Resultados para: "{termoBusca}"</h2>
      <div className="lista-produtos">
        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          produtos.map((produto) => (
            <div className="produto-card" key={produto.id}>
              <img src={produto.imagemUrl} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <p>R$ {produto.preco}</p>
              <p>Categoria: {produto.categoria}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Buscar;
