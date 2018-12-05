import React from 'react';

import { useHawkSearch } from 'store/Store';
import SearchBox from 'ui/SearchBox';
import Results from 'ui/Results';
import { FacetList } from 'ui/Facets';

function App() {
	const { actor } = useHawkSearch();

	return (
		<>
			<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
				<div style={{ flex: '0 0 100%' }}>
					<SearchBox />
				</div>
				<div style={{ width: '400px' }}>
					<FacetList />
				</div>
				<div style={{}}>
					<Results />
				</div>
			</div>
		</>
	);
}

export default App;
