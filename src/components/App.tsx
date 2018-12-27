import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBox from 'components/ui/SearchBox';
import Results from 'components/ui/Results';
import { FacetRail } from 'components/ui/Facets';
import ToolRow from 'components/ui/ToolRow';

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

					<div className="hawk__results">
						<ToolRow />

						<Results />

						<ToolRow />
					</div>
				</>
			)}
		</div>
	);
}

export default App;
