import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDash = () => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    descricao: '',
    categoria: '',
    imagem: null,
  });

  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduto((prev) => ({ ...prev, imagem: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', produto.nome);
    formData.append('preco', produto.preco);
    formData.append('descricao', produto.descricao);
    formData.append('categoria', produto.categoria);
    formData.append('imagem', produto.imagem);

    try {
      const res = await fetch('https://lojamoveis.onrender.com/api/Produto/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMensagem('Produto cadastrado com sucesso!');
        
        // Redirecionar com base na categoria
        const categoria = data.categoria.toLowerCase();
        navigate(`/${categoria}`);
      } else {
        const erro = await res.text();
        setMensagem(`Erro: ${erro}`);
      }
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input name="nome" type="text" onChange={handleChange} required />

        <label>Preço:</label>
        <input name="preco" type="number" step="0.01" onChange={handleChange} required />

        <label>Descrição:</label>
        <textarea name="descricao" onChange={handleChange} required />

        <label>Categoria:</label>
        <select name="categoria" onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="lancamentos">Lançamentos</option>
          <option value="promocoes">Promoções</option>
          <option value="guarda-roupa">Guarda-Roupa</option>
          <option value="sala-estar">Sala de Estar</option>
          <option value="sofas">Sofás</option>
          <option value="cozinhas">Cozinhas</option>
          <option value="cadeiras">Cadeiras</option>
          <option value="mesas">Mesas</option>
          <option value="paineis">Painéis</option>
          <option value="estantes">Estantes</option>
          <option value="camas">Camas</option>
          <option value="lavanderia">Lavanderia</option>
        </select>

        <label>Imagem:</label>
        <input name="imagem" type="file" accept="image/*" onChange={handleFileChange} required />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
    </div>
  );
};

export default AdminDash;
