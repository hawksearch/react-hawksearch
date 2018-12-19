import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import Facet from './Facet';

function FacetList() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	if ((!searchResults || searchResults.Facets.length === 0) && !isLoading) {
		return <span>No Facets</span>;
	}

	return (
		<>
			<span>Facets: </span>

			{isLoading ? <span>Loading...</span> : null}

			<div>
				<ul>
					{searchResults && searchResults.Facets.map(facet => <Facet key={facet.FacetId} facet={facet} />)}
				</ul>
			</div>
		</>
	);
}

export default FacetList;
