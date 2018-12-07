import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import Facet from './Facet';

function FacetList() {
	const { store } = useHawkSearch();

	if ((!store.facets || store.facets.length === 0) && !store.isLoading) {
		return <span>No Facets</span>;
	}

	return (
		<>
			<span>Facets: </span>

			{store.isLoading ? <span>Loading...</span> : null}

			<div>
				<ul>{store.facets && store.facets.map(facet => <Facet key={facet.FacetId} facet={facet} />)}</ul>
			</div>
		</>
	);
}

export default FacetList;
