import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { HawkStoreProvider } from 'store/Store';
import App from 'App';

ReactDOM.render(
	<HawkStoreProvider>
		<App />
	</HawkStoreProvider>,
	document.getElementById('app')
);
