import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import Facet from './Facet';
import Checkbox from './Checkbox';

function FacetList() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	if ((!searchResults || searchResults.Facets.length === 0) && !isLoading) {
		return <span>No Facets</span>;
	}

	const components = {
		checkbox: Checkbox,
	};

	return (
		<div>
			<span>Facets: </span>
			<div>
				<ul>
					{searchResults &&
						searchResults.Facets.map(facet => {
							const Component = components[facet.FacetType];

							return (
								<Facet key={facet.FacetId} facet={facet}>
									{Component ? <Component /> : <div>{facet.FacetType} is not implemented!</div>}
								</Facet>
							);
						})}
				</ul>
			</div>
		</div>
	);
}

export default FacetList;
