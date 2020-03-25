import React from 'react';
import { ToastContainer } from 'react-toastify';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
