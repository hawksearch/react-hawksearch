//
// this file is the entry point for the main search application when running the minified bundle
//

import '@babel/polyfill';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import 'rheostat/initialize';

import QueryStringListener from 'components/QueryStringListener';
import App from 'app/App';
import HawkSearch from 'components/HawkSearch';
import { parseLocation } from 'util/QueryString';
import { HawkSearchConfig } from 'types/HawkSearchConfig';

declare global {
	interface Window {
		HawkSearch?: HawkSearchConfig;
	}
}

if (window.HawkSearch) {
	initializeSearch(window.HawkSearch);
}

export function initializeSearch(config: HawkSearchConfig) {
	if (!config.searchElement) {
		throw new Error('window.HawkSearch.searchElement has not been configured');
	}

	const renderElem =
		typeof config.searchElement === 'string' ? document.getElementById(config.searchElement) : config.searchElement;

	// pull the initial search from location
	const searchRequest = parseLocation(location);

	ReactDOM.render(
		<HawkSearch config={config} initialSearch={searchRequest}>
			<QueryStringListener />
			<App />
		</HawkSearch>,
		renderElem
	);
}
