import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Store from './store/Store';

const store = new Store();

ReactDOM.render(<App store={store} />, document.getElementById('app'));
