// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client'; // Requerido para React 18
// import App from './App.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>

//     <App />
    
//   </StrictMode>
// );


import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { UserProvider } from './components/UserContext'; // Remova o UserContext, deixe só UserProvider
import { CartProvider } from './components/Carrinho/CartContext';
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from './components/Barra-Pesquisa/SearchContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <AuthProvider>
    <UserProvider>
      <CartProvider>
        <SearchProvider> {/* <- aqui */}
          <App />
        </SearchProvider>
      </CartProvider>
    </UserProvider>
    </AuthProvider>
    
  </React.StrictMode>
);
