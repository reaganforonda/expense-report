import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.css';
import App from './App';
import {Provider} from 'react-redux';
import { unregister } from "./registerServiceWorker";
import {HashRouter} from 'react-router-dom';
import store from './store';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));
// registerServiceWorker();
unregister();