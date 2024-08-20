import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ContextApp} from './compo/context.jsx';
import axios from 'axios';

// Set withCredentials to true globally
axios.defaults.withCredentials = true;


ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextApp>
    <App />
  </ContextApp>
)
