import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBox from 'components/ui/SearchBox';
import { FacetRail } from 'components/ui/Facets';
import { Results } from 'components/ui/Results';

function App() {
	const { store } = useHawkSearch();

	return (
		<div>
			{store.isInitialLoad ? (
				<div>
					<span>Loading...</span>
				</div>
			) : (
				<>
					<SearchBox />

					<FacetRail />

					<Results />
				</>
			)}
		</div>
	);
}

export default App;
