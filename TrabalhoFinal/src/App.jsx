import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Ajuste o caminho conforme necessário
import Navbar from './components/Footer-e-NavBar/Navbar';
import Footer from './components/Footer-e-NavBar/Footer';

import Home from './components/Home';
import Carrinho from './components/Carrinho/Carrinho';
import Atendimento from './components/Atendimento/Atendimento';
import Sobre from './components/Sobre';
import Login from './components/Login-e-Cadastro/Login';
import CadastroCliente from './components/Login-e-Cadastro/CadastroCliente';


import CadastroProduto from './components/Login-e-Cadastro/CadastroProduto';
import Lancamentos from './components/PaginasCategoria/Lancamentos';
import Sofas from './components/PaginasCategoria/Sofas';
import GuardaRoupa from './components/PaginasCategoria/GuardaRoupa';
import SalaEstar from './components/PaginasCategoria/SalaEstar';
import Cozinhas from './components/PaginasCategoria/Cozinhas';
import Banheiro from './components/PaginasCategoria/Banheiro'
import Escritorio from './components/PaginasCategoria/Escritorio';
import Paineis from './components/PaginasCategoria/Paineis';
import Camas from './components/PaginasCategoria/Camas';
import Lavanderia from './components/PaginasCategoria/Lavanderia';
import Promocoes from './components/PaginasCategoria/Promocoes';
import RedefinirSenha from './components/Redefinir-Senhas/RedefinirSenha';
import EsqueciSenha from './components/Redefinir-Senhas/EsqueciSenha';
import MeuPerfil from './components/MeuPerfil/MeuPerfi';
import Pagamento from './components/Pagamentos/Pagamento';
import ProdutoDetalhes from './components/Produtos-Pedidos/ProdutoDetalhes';
import PedidosAdmin from './components/Produtos-Pedidos/PedidosAdmin';
import ScrollToTop from './components/ScrollToTop';
import PortasJanelas from './components/PaginasCategoria/PortasJanelas';
import BuscaProdutos from './components/Barra-Pesquisa/BuscaProdutos';




const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Páginas principais */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/atendimento" element={<Atendimento />} />
        <Route path="/conta" element={<Login />} />
        <Route path="/cadastro" element={<CadastroCliente />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/meuperfil" element={<MeuPerfil/>} />
        <Route path="/admin-painel" element={<PedidosAdmin/>} />
        


        <Route path="/admin" element={<CadastroProduto />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/guarda-roupas" element={<GuardaRoupa />} />
        <Route path="/sala-de-estar" element={<SalaEstar />} />
        <Route path="/cozinhas" element={<Cozinhas />} />
        <Route path="/banheiro" element={<Banheiro />} /> 
        <Route path="/escritorio" element={<Escritorio />} /> 
        <Route path="/paineis" element={<Paineis />} /> 
        <Route path="/camas" element={<Camas />} /> 
        <Route path="/lavanderia" element={<Lavanderia />} /> 
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/produto/:id" element={<ProdutoDetalhes />} />
        <Route path="/portaejanelas" element={<PortasJanelas />} />



        <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/busca" element={<BuscaProdutos />} />



      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
