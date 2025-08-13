// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CadastroProduto.css';

// const CadastroProduto = () => {
//   const [produto, setProduto] = useState({
//     nome: '',
//     preco: '',
//     descricao: '',
//     categoria: '',
//     imagem: null,
//   });

//   const [imagensExtras, setImagensExtras] = useState([]);
//   const [imagemPreview, setImagemPreview] = useState(null);
//   const [previewsExtras, setPreviewsExtras] = useState([]);
//   const [mensagem, setMensagem] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [produtoCadastrado, setProdutoCadastrado] = useState(null);
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

//   const handleExtrasChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImagensExtras(files);

//     const previews = files.map((file) => URL.createObjectURL(file));
//     setPreviewsExtras(previews);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!produto.imagem) {
//       setMensagem('Imagem principal obrigatória.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('nome', produto.nome);
//     formData.append('preco', produto.preco);
//     formData.append('descricao', produto.descricao);
//     formData.append('categoria', produto.categoria);
//     formData.append('imagem', produto.imagem);

//     imagensExtras.forEach((img) => {
//       formData.append('imagensExtras', img);
//     });

//     try {
//       const res = await fetch('https://lojamoveis.onrender.com/api/Produto/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setProdutoCadastrado(data);
//         setShowSuccessModal(true);
//         setMensagem('✅ Produto cadastrado com sucesso!');
//       } else {
//         const erro = await res.text();
//         setMensagem(`❌ Erro ao cadastrar produto: ${erro}`);
//       }
//     } catch (err) {
//       console.error('Erro ao conectar com servidor:', err);
//       setMensagem('❌ Erro ao conectar com o servidor.');
//     }
//   };

//   const closeModal = () => {
//     setShowSuccessModal(false);
//     const categoria = produtoCadastrado?.categoria?.toLowerCase();
//     if (categoria) navigate(`/${categoria}`);
//   };

//   return (
//     <div className="cadastro-container">
//       <h2 className="cadastro-titulo">Cadastrar Produto</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="cadastro-form">
//         <div className="form--group">
//           <label className="form-label">Nome:</label>
//           <input 
//             name="nome" 
//             type="text" 
//             onChange={handleChange} 
//             required 
//             className="form--input"
//           />
//         </div>

//         <div className="form--group">
//           <label className="form-label">Preço:</label>
//           <input 
//             name="preco" 
//             type="number" 
//             step="0.01" 
//             onChange={handleChange} 
//             required 
//             className="form--input"
//           />
//         </div>


//         <div className="form--group">
//           <label className="form-label">Descrição:</label>
//           <textarea 
//             name="descricao" 
//             onChange={handleChange} 
//             required 
//             className="form-textarea"
//           />
//         </div>

//         <div className="form--group">
//           <label className="form-label">Categoria:</label>
//           <select 
//             name="categoria" 
//             onChange={handleChange} 
//             required 
//             className="form-select"
//           >
//             <option value="">Selecione</option>
//             <option value="lancamentos">Lançamentos</option>
//             <option value="promocoes">Promoções</option>
//             <option value="guarda-roupas">Guarda-Roupa</option>
//             <option value="sala-de-estar">Sala de Estar</option>
//             <option value="sofas">Sofás</option>
//             <option value="cozinhas">Cozinhas</option>
//             <option value="escritorio">Escritório</option>
//             <option value="banheiro">Banheiro</option>
//             <option value="paineis">Painéis</option>
//             <option value="estantes">Estantes</option>
//             <option value="camas">Camas</option>
//             <option value="lavanderia">Lavanderia</option>
//           </select>
//         </div>

//         <div className="form--group">
//           <label className="form-label">Imagem principal:</label>
//           <input 
//             name="imagem" 
//             type="file" 
//             accept="image/*" 
//             onChange={handleFileChange} 
//             required 
//             className="form-file"
//           />
//         </div>

//         {imagemPreview && (
//           <div className="preview-group">
//             <span className="preview-label">Pré-visualização principal:</span>
//             <img
//               src={imagemPreview}
//               alt="Preview"
//               className="preview-image"
//             />
//           </div>
//         )}

//         <div className="form--group">
//           <label className="form-label">Imagens extras (opcional):</label>
//           <input 
//             type="file" 
//             accept="image/*" 
//             multiple 
//             onChange={handleExtrasChange} 
//             className="form-file"
//           />
//         </div>

//         {previewsExtras.length > 0 && (
//           <div className="extras-preview-container">
//             <span className="preview-label">Pré-visualização extras:</span>
//             <div className="extras-grid">
//               {previewsExtras.map((src, i) => (
//                 <div key={i} className="extra-image-wrapper">
//                   <img
//                     src={src}
//                     alt={`Extra ${i + 1}`}
//                     className="extra-image"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <button type="submit" className="submitt-button">Cadastrar Produto</button>
//       </form>

//       {/* Modal de Sucesso */}
//       {showSuccessModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3>Produto Cadastrado com Sucesso!</h3>
//               <button className="close-button" onClick={closeModal}>×</button>
//             </div>
//             <div className="modal-body">
//               <div className="success-icon">✓</div>
//               <div className="product-preview">
//                 {imagemPreview && (
//                   <img src={imagemPreview} alt="Produto cadastrado" className="product-image" />
//                 )}
//                 <div className="product-details">
//                   <h4>{produtoCadastrado?.nome}</h4>
//                   <p><strong>Preço:</strong> R$ {produtoCadastrado?.preco?.toFixed(2)}</p>
//                   <p><strong>Categoria:</strong> {produtoCadastrado?.categoria}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="modal-button" onClick={closeModal}>
//                 Continuar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {mensagem && !showSuccessModal && (
//         <p className={`mensagem ${mensagem.includes('sucesso') ? 'mensagem-sucesso' : 'mensagem-erro'}`}>
//           {mensagem}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CadastroProduto;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import './CadastroProduto.css';

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: 0, // Alterado de '' para 0
    descricao: '',
    categoria: '',
    imagem: null,
  });

  const [imagensExtras, setImagensExtras] = useState([]);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [previewsExtras, setPreviewsExtras] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [produtoCadastrado, setProdutoCadastrado] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (value) => {
  // Converte o valor formatado (string) para número
  const numericValue = value ? parseFloat(value.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) : 0;
  setProduto(prev => ({ ...prev, preco: numericValue }));
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

  // const formatCurrency = (value) => {
  //   return new Intl.NumberFormat('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL'
  //   }).format(value || 0);
  // };

  const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

  const formatCategory = (category) => {
    const categoriesMap = {
      'lancamentos': 'Lançamentos',
      'promocoes': 'Promoções',
      'guarda-roupas': 'Guarda-Roupas',
      'sala-de-estar': 'Sala de Estar',
      'sofas': 'Sofás',
      'cozinhas': 'Cozinhas',
      'escritorio': 'Escritório',
      'banheiro': 'Banheiro',
      'paineis': 'Painéis',
      'estantes': 'Estantes',
      'camas': 'Camas',
      'lavanderia': 'Lavanderia'
    };
    return categoriesMap[category] || category;
  };

  const convertCurrencyToNumber = (currencyString) => {
    if (!currencyString) return 0;
    return parseFloat(currencyString
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produto.imagem) {
      setMensagem('Imagem principal obrigatória.');
      return;
    }

    // const formData = new FormData();
    // formData.append('nome', produto.nome);
    // formData.append('preco', convertCurrencyToNumber(produto.preco));
    // formData.append('descricao', produto.descricao);
    // formData.append('categoria', produto.categoria);
    // formData.append('imagem', produto.imagem);

    const formData = new FormData();
  formData.append('nome', produto.nome);
  formData.append('preco', produto.preco); // Já é um número
  formData.append('descricao', produto.descricao);
  formData.append('categoria', produto.categoria);
  formData.append('imagem', produto.imagem);

    imagensExtras.forEach((img) => {
      formData.append('imagensExtras', img);
    });

    try {
      const res = await fetch('https://lojamoveis.onrender.com/api/Produto/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setProdutoCadastrado(data);
        setShowSuccessModal(true);
        setMensagem('✅ Produto cadastrado com sucesso!');
      } else {
        const erro = await res.text();
        setMensagem(`❌ Erro ao cadastrar produto: ${erro}`);
      }
    } catch (err) {
      console.error('Erro ao conectar com servidor:', err);
      setMensagem('❌ Erro ao conectar com o servidor.');
    }
  };

  // const closeModal = () => {
  //   setShowSuccessModal(false);
  //   const categoria = produtoCadastrado?.categoria?.toLowerCase();
  //   if (categoria) navigate(`/${categoria}`);
  // };
  const closeModal = () => {
  setShowSuccessModal(false);
  if (produto.categoria) {
    navigate(`/${produto.categoria.toLowerCase()}`);
  } else {
    navigate('/'); // Fallback caso não tenha categoria
  }
};

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-titulo">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="cadastro-form">
        <div className="form--group">
          <label className="form-label">Nome:</label>
          <input 
            name="nome" 
            type="text" 
            onChange={handleChange} 
            required 
            className="form--input"
          />
        </div>

        <div className="form--group">
          <label className="form-label">Preço:</label>
          <CurrencyInput
            name="preco"
            value={produto.preco}
            onValueChange={handlePriceChange}
            prefix="R$ "
            decimalSeparator=","
            groupSeparator="."
            decimalsLimit={2}
            required
            className="form--input"
          />
        </div>

        <div className="form--group">
          <label className="form-label">Descrição:</label>
          <textarea 
            name="descricao" 
            onChange={handleChange} 
            required 
            className="form-textarea"
          />
        </div>

        <div className="form--group">
          <label className="form-label">Categoria:</label>
          <select 
            name="categoria" 
            onChange={handleChange} 
            required 
            className="form-select"
          >
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
            <option value="portaejanelas">Portas e Janelas</option>
            <option value="camas">Camas</option>
            <option value="lavanderia">Lavanderia</option>
          </select>
        </div>

        <div className="form--group">
          <label className="form-label">Imagem principal:</label>
          <input 
            name="imagem" 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
            className="form-file"
          />
        </div>

        {imagemPreview && (
          <div className="preview-group">
            <span className="preview-label">Pré-visualização principal:</span>
            <img
              src={imagemPreview}
              alt="Preview"
              className="preview-image"
            />
          </div>
        )}

        <div className="form--group">
          <label className="form-label">Imagens extras (opcional):</label>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleExtrasChange} 
            className="form-file"
          />
        </div>

        {previewsExtras.length > 0 && (
          <div className="extras-preview-container">
            <span className="preview-label">Pré-visualização extras:</span>
            <div className="extras-grid">
              {previewsExtras.map((src, i) => (
                <div key={i} className="extra-image-wrapper">
                  <img
                    src={src}
                    alt={`Extra ${i + 1}`}
                    className="extra-image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="submitt-button">Cadastrar Produto</button>
      </form>

      {showSuccessModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h3>Produto Cadastrado com Sucesso!</h3>
        <button className="close-button" onClick={closeModal}>×</button>
      </div>
      <div className="modal-body">
        <div className="success-icon">✓</div>
        <div className="product-preview">
          {imagemPreview && (
            <img src={imagemPreview} alt="Produto cadastrado" className="product-image" />
          )}
          <div className="product-details">
            <h4>{produto.nome}</h4> {/* Mostra direto do estado produto */}
            <p><strong>Preço:</strong> {formatCurrency(produto.preco)}</p>
            <p><strong>Categoria:</strong> {formatCategory(produto.categoria)}</p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-button" onClick={closeModal}>
          Continuar {formatCategory(produto.categoria)}
        </button>
      </div>
    </div>
  </div>
)}

      {mensagem && !showSuccessModal && (
        <p className={`mensagem ${mensagem.includes('sucesso') ? 'mensagem-sucesso' : 'mensagem-erro'}`}>
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default CadastroProduto;