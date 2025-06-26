// import React, { useState } from "react";

// const AdminDash = () => {
//   const [produto, setProduto] = useState({
//     nome: "",
//     preco: "",
//     descricao: "",
//     categoria: ""
//   });
//   const [imagem, setImagem] = useState(null);
//   const [mensagem, setMensagem] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduto({ ...produto, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setImagem(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("nome", produto.nome);
//     formData.append("preco", produto.preco);
//     formData.append("descricao", produto.descricao);
//     formData.append("categoria", produto.categoria);
//     if (imagem) formData.append("imagem", imagem);

//     try {
//       const res = await fetch("https://localhost:7252/api/Produto/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.text();
//       if (res.ok) {
//         setMensagem("Produto adicionado com sucesso!");
//         setProduto({ nome: "", preco: "", descricao: "", categoria: "" });
//         setImagem(null);
//       } else {
//         setMensagem(data || "Erro ao adicionar o produto.");
//       }
//     } catch (error) {
//       setMensagem("Erro ao conectar com o servidor.");
//     }
//   };

//   return (
//     <div className="admin-dash">
//       <h2>Adicionar Produto</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="nome" placeholder="Nome" value={produto.nome} onChange={handleChange} required />
//         <input name="preco" placeholder="Preço" type="number" value={produto.preco} onChange={handleChange} required />
//         <textarea name="descricao" placeholder="Descrição" value={produto.descricao} onChange={handleChange} required />
//         <select name="categoria" value={produto.categoria} onChange={handleChange} required>
//           <option value="">Selecione a categoria</option>
//           <option value="Lançamentos">Lançamentos</option>
//           <option value="Sofás">Sofás</option>
//           <option value="Cozinha">Cozinha</option>
//           {/* Adicione mais categorias conforme quiser */}
//         </select>
//         <input type="file" accept="image/*" onChange={handleFileChange} required />
//         <button type="submit">Adicionar Produto</button>
//       </form>
//       {mensagem && <p>{mensagem}</p>}
//     </div>
//   );
// };

// export default AdminDash;

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
      const res = await fetch('https://localhost:7252/api/Produto/upload', {
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
