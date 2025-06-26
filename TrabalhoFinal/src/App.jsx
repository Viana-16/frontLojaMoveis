

// // import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import Carrinho from './components/Carrinho';
// import RastrearPedido from './components/RastrearPedido';
// import Atendimento from './components/Atendimento';
// import Sobre from './components/Sobre';
// import Login from './components/Login';
// import CadastroCliente from './components/CadastroCliente';
// import ClienteDash from './components/ClienteDash';
// import AdminDash from './components/AdminDash';
// import Perfil from './components/Perfil';
// import PainelAdmin from './components/PainelAdmin';

 

 

// const App = () => {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/carrinho" element={<Carrinho />} />
//         <Route path="/rastrearpedido" element={<RastrearPedido />} />
//         <Route path="/atendimento" element={<Atendimento />} />
//         <Route path="/conta" element={<Login />} />
//         <Route path="/cadastro" element={<CadastroCliente />} />
//         <Route path="/admin" element={<AdminDash />} />
//         <Route path="/cliente" element={<ClienteDash />} />
//         <Route path="/sobre" element={<Sobre />} />
//         <Route path="/perfil" element={<Perfil />} />
//         <Route path="/admin/painel" element={<PainelAdmin />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import RastrearPedido from './components/RastrearPedido';
import Atendimento from './components/Atendimento';
import Sobre from './components/Sobre';
import Login from './components/Login';
import CadastroCliente from './components/CadastroCliente';
// import AdminDash from './components/AdminDash';
import PainelAdmin from './components/PainelAdmin';


import CadastroProduto from './components/CadastroProduto';
import Lancamentos from './components/PaginasCategoria/Lancamentos';
import Sofas from './components/PaginasCategoria/Sofas';
import GuardaRoupa from './components/PaginasCategoria/GuardaRoupa';
import SalaEstar from './components/PaginasCategoria/SalaEstar';
import Cozinhas from './components/PaginasCategoria/Cozinhas';
import Banheiro from './components/PaginasCategoria/Banheiro'
import Escritorio from './components/PaginasCategoria/Escritorio';
import Paineis from './components/PaginasCategoria/Paineis';
import Estantes from './components/PaginasCategoria/Estantes';
import Camas from './components/PaginasCategoria/Camas';
import Lavanderia from './components/PaginasCategoria/Lavanderia';
import Promocoes from './components/PaginasCategoria/Promocoes';
import Buscar from './components/Barra-Pesquisa/Buscar';
import RedefinirSenha from './components/RedefinirSenha';
import EsqueciSenha from './components/EsqueciSenha';
import MeuPerfil from './components/MeuPerfi';




const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Páginas principais */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/rastrearpedido" element={<RastrearPedido />} />
        <Route path="/atendimento" element={<Atendimento />} />
        <Route path="/conta" element={<Login />} />
        <Route path="/cadastro" element={<CadastroCliente />} />
        {/* <Route path="/admin" element={<AdminDash />} /> */}
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/meuperfil" element={<MeuPerfil/>} />
        <Route path="/admin/painel" element={<PainelAdmin />} />


        <Route path="/admin" element={<CadastroProduto />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/guarda-roupas" element={<GuardaRoupa />} />
        <Route path="/sala-de-estar" element={<SalaEstar />} />
        <Route path="/cozinhas" element={<Cozinhas />} />
        <Route path="/banheiro" element={<Banheiro />} /> 
        <Route path="/escritorio" element={<Escritorio />} /> 
        <Route path="/paineis" element={<Paineis />} /> 
        <Route path="/estantes" element={<Estantes />} /> 
        <Route path="/camas" element={<Camas />} /> 
        <Route path="/lavanderia" element={<Lavanderia />} /> 
        <Route path="/promocoes" element={<Promocoes />} /> 


        <Route path="/buscar" element={<Buscar />} />
        <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />



      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
