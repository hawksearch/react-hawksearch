import React from 'react';

import { useHawkStore } from 'store/Store';

function Facets() {
	const { store } = useHawkStore();

	if (store.isLoading) {
		return <span>Loading...</span>;
	}

	if (!store.facets) {
		return <span>No facets</span>;
	}

	return (
		<div>
			{store.facets.map(facet => (
				<li key={facet.FacetId}>{facet.Name}</li>
			))}
		</div>
	);
}

export default Facets;
