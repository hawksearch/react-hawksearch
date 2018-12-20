import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import Facet from './Facet';

function Facets() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	if ((!searchResults || searchResults.Facets.length === 0) && !isLoading) {
		return <span>No Facets</span>;
	}

	return (
		<div>
			<span>Facets: </span>

			{isLoading ? <span>Loading...</span> : null}

			<div>
				<ul>
					{searchResults && searchResults.Facets.map(facet => <Facet key={facet.FacetId} facet={facet} />)}
				</ul>
			</div>
		</div>
	);
}

export default Facets;
