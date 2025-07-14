// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CadastroProduto = () => {
//   const [produto, setProduto] = useState({
//     nome: '',
//     preco: '',
//     descricao: '',
//     categoria: '',
//     imagem: null,
//   });

//   const [mensagem, setMensagem] = useState('');
//   const [imagemPreview, setImagemPreview] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduto((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProduto((prev) => ({ ...prev, imagem: file }));

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagemPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!produto.imagem) {
//       setMensagem('Imagem obrigatória.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('nome', produto.nome);
//     formData.append('preco', produto.preco);
//     formData.append('descricao', produto.descricao);
//     formData.append('categoria', produto.categoria);
//     formData.append('imagem', produto.imagem); // nome precisa estar igual ao parâmetro no controller

//     try {
//       const res = await fetch('https://localhost:7252/api/Produto/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMensagem('✅ Produto cadastrado com sucesso!');
//         console.log("Produto salvo:", data);

//         // Redirecionar com base na categoria
//         const categoria = data.categoria?.toLowerCase();
//         if (categoria) navigate(`/${categoria}`);
//       } else {
//         const erro = await res.text();
//         setMensagem(`❌ Erro ao cadastrar produto: ${erro}`);
//       }
//     } catch (err) {
//       console.error('Erro ao conectar com servidor:', err);
//       setMensagem('❌ Erro ao conectar com o servidor.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto' }}>
//       <h2 style={{ textAlign: 'center' }}>Cadastrar Produto</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>Nome:</label>
//         <input name="nome" type="text" onChange={handleChange} required />

//         <label>Preço:</label>
//         <input name="preco" type="number" step="0.01" onChange={handleChange} required />

//         <label>Descrição:</label>
//         <textarea name="descricao" onChange={handleChange} required />

//         <label>Categoria:</label>
//         <select name="categoria" onChange={handleChange} required>
//           <option value="">Selecione</option>
//           <option value="lancamentos">Lançamentos</option>
//           <option value="promocoes">Promoções</option>
//           <option value="guarda-roupas">Guarda-Roupa</option>
//           <option value="sala-de-estar">Sala de Estar</option>
//           <option value="sofas">Sofás</option>
//           <option value="cozinhas">Cozinhas</option>
//           <option value="escritorio">Escritório</option>
//           <option value="banheiro">Banheiro</option>
//           <option value="paineis">Painéis</option>
//           <option value="estantes">Estantes</option>
//           <option value="camas">Camas</option>
//           <option value="lavanderia">Lavanderia</option>
//         </select>

//         <label>Imagem:</label>
//         <input name="imagem" type="file" accept="image/*" onChange={handleFileChange} required />

//         {imagemPreview && (
//           <div style={{ marginTop: 10 }}>
//             <strong>Pré-visualização:</strong>
//             <img
//               src={imagemPreview}
//               alt="Preview"
//               style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
//             />
//           </div>
//         )}

//         <button type="submit" style={{ marginTop: '15px' }}>Cadastrar</button>
//       </form>

//       {mensagem && (
//         <p style={{ color: mensagem.includes('sucesso') ? 'green' : 'red', marginTop: '10px' }}>
//           {mensagem}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CadastroProduto;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    descricao: '',
    categoria: '',
    imagem: null,
  });

  const [imagensExtras, setImagensExtras] = useState([]);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [previewsExtras, setPreviewsExtras] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduto((prev) => ({ ...prev, imagem: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtrasChange = (e) => {
    const files = Array.from(e.target.files);
    setImagensExtras(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewsExtras(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produto.imagem) {
      setMensagem('Imagem principal obrigatória.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', produto.nome);
    formData.append('preco', produto.preco);
    formData.append('descricao', produto.descricao);
    formData.append('categoria', produto.categoria);
    formData.append('imagem', produto.imagem); // imagem principal

    imagensExtras.forEach((img) => {
      formData.append('imagensExtras', img);
    });

    try {
      const res = await fetch('https://localhost:7252/api/Produto/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMensagem('✅ Produto cadastrado com sucesso!');
        console.log("Produto salvo:", data);

        const categoria = data.categoria?.toLowerCase();
        if (categoria) navigate(`/${categoria}`);
      } else {
        const erro = await res.text();
        setMensagem(`❌ Erro ao cadastrar produto: ${erro}`);
      }
    } catch (err) {
      console.error('Erro ao conectar com servidor:', err);
      setMensagem('❌ Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <option value="guarda-roupas">Guarda-Roupa</option>
          <option value="sala-de-estar">Sala de Estar</option>
          <option value="sofas">Sofás</option>
          <option value="cozinhas">Cozinhas</option>
          <option value="escritorio">Escritório</option>
          <option value="banheiro">Banheiro</option>
          <option value="paineis">Painéis</option>
          <option value="estantes">Estantes</option>
          <option value="camas">Camas</option>
          <option value="lavanderia">Lavanderia</option>
        </select>

        <label>Imagem principal:</label>
        <input name="imagem" type="file" accept="image/*" onChange={handleFileChange} required />

        {imagemPreview && (
          <div style={{ marginTop: 10 }}>
            <strong>Pré-visualização principal:</strong>
            <img
              src={imagemPreview}
              alt="Preview"
              style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
            />
          </div>
        )}

        <label>Imagens extras (opcional):</label>
        <input type="file" accept="image/*" multiple onChange={handleExtrasChange} />

        {previewsExtras.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
            {previewsExtras.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Extra ${i + 1}`}
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6 }}
              />
            ))}
          </div>
        )}

        <button type="submit" style={{ marginTop: '20px' }}>Cadastrar Produto</button>
      </form>

      {mensagem && (
        <p style={{ color: mensagem.includes('sucesso') ? 'green' : 'red', marginTop: '10px' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default CadastroProduto;