import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.css';
import App from './App';
import { unregister } from "./registerServiceWorker";
import {HashRouter} from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));
// registerServiceWorker();
unregister();