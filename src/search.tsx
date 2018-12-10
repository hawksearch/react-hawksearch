import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import StoreProvider from 'components/StoreProvider';
import QueryStringListener from 'components/QueryStringListener';
import App from 'components/App';
import { parseSearchQueryString } from 'util/QueryString';

// pull the initial search from the query string
const { keyword, facetSelections } = parseSearchQueryString(location.search);
import 'styles/app.scss';

ReactDOM.render(
	<StoreProvider initialSearch={{ Keyword: keyword, FacetSelections: facetSelections }}>
		<QueryStringListener />
		<App />
	</StoreProvider>,
	document.getElementById('app')
);
