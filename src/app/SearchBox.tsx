//
// this file is the entry point for the searchbox application when running the minified bundle
//

import '@babel/polyfill';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { HawkSearchConfig } from 'types/HawkSearchConfig';
import ConfigProvider from 'components/ConfigProvider';
import GlobalSearchBox from 'components/ui/SearchBox/GlobalSearchBox';

declare global {
	interface Window {
		HawkSearch?: HawkSearchConfig;
	}
}

if (window.HawkSearch) {
	initializeSearchBox(window.HawkSearch);
}

export function initializeSearchBox(config: HawkSearchConfig) {
	if (!config.searchBoxElement) {
		throw new Error('window.HawkSearch.searchBoxElement has not been configured');
	}

	const renderElem =
		typeof config.searchBoxElement === 'string'
			? document.getElementById(config.searchBoxElement)
			: config.searchBoxElement;

	ReactDOM.render(
		<ConfigProvider config={config}>
			<GlobalSearchBox />
		</ConfigProvider>,
		renderElem
	);
}
