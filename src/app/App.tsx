import React from 'react';
import ReactDOM from 'react-dom';

import SearchBox from 'components/ui/SearchBox/SearchBox';
import FacetRail from 'components/ui/Facets/FacetRail';
import { Results } from 'components/ui/Results';
import { useHawkConfig } from 'components/ConfigProvider';

function App() {
	const { config } = useHawkConfig();

	function getElement(elem: HTMLElement | string) {
		if (typeof elem === 'string') {
			return document.getElementById(elem);
		}

		return elem;
	}

	function renderSearchBox() {
		return (
			<div className="hawk">
				<div className="hawk__header">
					<SearchBox />
				</div>
			</div>
		);
	}

	const renderElem = config.searchBoxElement ? getElement(config.searchBoxElement) : null;

	return (
		<>
			{renderElem ? ReactDOM.createPortal(renderSearchBox(), renderElem) : renderSearchBox()}

			<div className="hawk">
				<div className="hawk__body">
					<FacetRail />

					<Results />
				</div>
			</div>
		</>
	);
}

export default App;
