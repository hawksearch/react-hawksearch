import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBox from 'components/ui/SearchBox';
import Results from 'components/ui/Results';
import { FacetList } from 'components/ui/Facets';
import Sorting from 'components/ui/Sorting';

function App() {
	const { store } = useHawkSearch();

	return (
		<>
			<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
				{store.isInitialLoad ? (
					<div>
						<span>Loading...</span>
					</div>
				) : (
					<>
						<div style={{ flex: '0 0 100%' }}>
							<SearchBox />
						</div>
						<div style={{ width: '400px' }}>
							<FacetList />
						</div>
						<div>
							<Sorting />
						</div>
						<div style={{}}>
							<Results />
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
