import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BookingContextProvider } from './context/BookingContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BookingContextProvider>
      <App />
    </BookingContextProvider>
  </React.StrictMode>
);

