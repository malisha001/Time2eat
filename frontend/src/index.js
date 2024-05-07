import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import { BookingContextProvider } from './context/BookingContext';
import CartProvider from './hooks/useCart.js';
import { DorderContextProvider } from './context/DorderContext';
//import { BrowserRouter } from 'react-router-dom';
import './axiosConfig';





import { AuthContextProvider } from './context/AuthContext';


// import { BookingContextProvider } from './context/BookingContext'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DorderContextProvider>
    <AuthContextProvider>
   
      <CartProvider>
        
        <App />
        
      </CartProvider>
      
    </AuthContextProvider>
    </DorderContextProvider>
  </React.StrictMode>
);