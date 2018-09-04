import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.css';
import App from './App';
import { unregister } from "./registerServiceWorker";
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
unregister();