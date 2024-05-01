import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import { BookingContextProvider } from './context/BookingContext';
import CartProvider from './hooks/useCart.js';
//import { BrowserRouter } from 'react-router-dom';
import './axiosConfig';





import { AuthContextProvider } from './context/AuthContext';

// import { BookingContextProvider } from './context/BookingContext'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthContextProvider>
  </React.StrictMode>
);