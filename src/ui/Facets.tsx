import React from 'react';

import { useHawkStore } from 'store/Store';

function Facets() {
	const { store } = useHawkStore();

	if (store.isLoading) {
		return <span>Loading...</span>;
	}

	if (!store.facets || store.facets.length === 0) {
		return <span>No Facets</span>;
	}

	return (
		<>
			<span>Facets:</span>
			<div>
				{store.facets.map(facet => (
					<li key={facet.FacetId}>
						<span>{facet.Name}</span>
						<div>
							<ol>
								{facet.Values.map(value => (
									<li key={facet.FacetId + value.Value}>
										{value.Label} ({value.Count})
									</li>
								))}
							</ol>
						</div>
					</li>
				))}
			</div>
		</>
	);
}

export default Facets;
