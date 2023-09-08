import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import SocketIO from 'socket.io-client';
import { Provider } from 'react-redux';
import { store } from './components/store/store.js';
import { BrowserRouter } from 'react-router-dom';


const socket = SocketIO.connect('http://localhost:5000');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App socket={socket}/> 
      </Provider>    
    </BrowserRouter> 
  </React.StrictMode>
);