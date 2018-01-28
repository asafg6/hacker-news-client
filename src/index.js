import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

if(navigator.onLine) {
	ReactDOM.render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('root'))
} else {
  ReactDOM.render((
    <div className="container">
      <h1> You are not connected to the internet !</h1>
    </div>
  ), document.getElementById('root'))
}

