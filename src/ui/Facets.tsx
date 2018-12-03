import React from 'react';

import { useHawkStore } from 'store/Store';

function Facets() {
	const { store } = useHawkStore();

	if ((!store.facets || store.facets.length === 0) && !store.isLoading) {
		return <span>No Facets</span>;
	}

	return (
		<>
			<span>Facets: </span>

			{store.isLoading ? <span>Loading...</span> : null}

			<div>
				{store.facets &&
					store.facets.map(facet => (
						<li key={facet.FacetId}>
							<span>{facet.Name}</span>
							<ol>
								{facet.Values.map(value => (
									<li key={facet.FacetId + value.Value}>
										{value.Label} ({value.Count})
									</li>
								))}
							</ol>
						</li>
					))}
			</div>
		</>
	);
}

export default Facets;
