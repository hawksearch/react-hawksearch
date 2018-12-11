import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import HomeSearchBox from 'components/ui/HomeSearchBox';
import ConfigProvider from 'components/ConfigProvider';
import { HawkSearchConfig } from 'HawkSearch';

import 'styles/app.scss';

export function initializeSearchBox(elementId: string, hawkConfig: HawkSearchConfig) {
	ReactDOM.render(
		<ConfigProvider config={hawkConfig}>
			<HomeSearchBox />
		</ConfigProvider>,
		document.getElementById(elementId)
	);
}

initializeSearchBox('searchbox', {
	clientGuid: 'f51060e1c38446f0bacdf283390c37e8',
	searchPageUrl: 'search.html',
});
