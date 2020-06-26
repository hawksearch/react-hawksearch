//
// this file is the entry point for the searchbox application when running the minified bundle
//

import '@babel/polyfill';
import 'url-search-params-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { HawksearchConfig } from 'types/HawksearchConfig';
import ConfigProvider from 'components/ConfigProvider';
import GlobalSearchBox from 'components/ui/SearchBox/GlobalSearchBox';

declare global {
	interface Window {
		Hawksearch?: HawksearchConfig;
	}
}

if (window.Hawksearch) {
	initializeSearchBox(window.Hawksearch);
}

export function initializeSearchBox(config: HawksearchConfig) {
	if (!config.searchBoxElement) {
		throw new Error('window.Hawksearch.searchBoxElement has not been configured');
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
