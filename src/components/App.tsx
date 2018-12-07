import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBox from 'components/ui/SearchBox';
import Results from 'components/ui/Results';
import { FacetList } from 'components/ui/Facets';

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
