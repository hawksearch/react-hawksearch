import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import StoreProvider from 'components/StoreProvider';
import ConfigProvider from 'components/ConfigProvider';
import QueryStringListener from 'components/QueryStringListener';
import App from 'components/App';
import { parseSearchQueryString } from 'util/QueryString';
import { HawkSearchConfig } from 'HawkSearch';

import 'styles/app.scss';

export function initializeSearch(elementId: string, hawkConfig: HawkSearchConfig) {
	// pull the initial search from the query string
	const { keyword, facetSelections } = parseSearchQueryString(location.search);

	ReactDOM.render(
		<ConfigProvider config={hawkConfig}>
			<StoreProvider initialSearch={{ Keyword: keyword, FacetSelections: facetSelections }}>
				<QueryStringListener />
				<App />
			</StoreProvider>
		</ConfigProvider>,
		document.getElementById(elementId)
	);
}

initializeSearch('app', {
	clientGuid: 'f51060e1c38446f0bacdf283390c37e8',
	searchPageUrl: 'search.html',
});
