import React from 'react';

import SearchBox from 'components/ui/SearchBox';
import { FacetRail } from 'components/ui/Facets';
import { Results } from 'components/ui/Results';

function App() {
	return (
		<div className="hawk">
			<div className="hawk__header">
				<SearchBox />
			</div>

			<div className="hawk__body">
				<FacetRail />

				<Results />
			</div>
		</div>
	);
}

export default App;
