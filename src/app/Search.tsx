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
import Hawksearch from 'components/Hawksearch';
import { parseLocation } from 'util/QueryString';
import { HawksearchConfig } from 'types/HawksearchConfig';

declare global {
	interface Window {
		Hawksearch?: HawksearchConfig;
	}
}

if (window.Hawksearch) {
	initializeSearch(window.Hawksearch);
}

export function initializeSearch(config: HawksearchConfig) {
	if (!config.searchElement) {
		throw new Error('window.Hawksearch.searchElement has not been configured');
	}

	const renderElem =
		typeof config.searchElement === 'string' ? document.getElementById(config.searchElement) : config.searchElement;

	// pull the initial search from location
	const searchRequest = parseLocation(location);

	ReactDOM.render(
		<Hawksearch config={config} initialSearch={searchRequest}>
			<QueryStringListener />
			<App />
		</Hawksearch>,
		renderElem
	);
}
