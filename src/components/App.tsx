import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBox from 'components/ui/SearchBox';
import Results from 'components/ui/Results';
import { FacetRail } from 'components/ui/Facets';
import Sorting from 'components/ui/Sorting';
import Pagination from 'components/ui/Pagination';
import ItemsPerPage from 'components/ui/ItemsPerPage';

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
						<div style={{ width: '350px' }}>
							<FacetRail />
						</div>
						<div style={{ paddingLeft: '1rem' }}>
							<div>
								<Sorting />
								<Pagination />
								<ItemsPerPage />
							</div>

							<Results />

							<div>
								<Sorting />
								<Pagination />
								<ItemsPerPage />
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
