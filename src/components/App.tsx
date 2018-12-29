import React from 'react';

import SearchBox from 'components/ui/SearchBox';
import { FacetRail } from 'components/ui/Facets';
import { Results } from 'components/ui/Results';

function App() {
	return (
		<div>
			<SearchBox />

			<FacetRail />

			<Results />
		</div>
	);
}

export default App;
