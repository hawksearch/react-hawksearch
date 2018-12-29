import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import Facet from './Facet';
import { Checkbox, Search } from './FacetTypes';

function FacetList() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	if ((!searchResults || searchResults.Facets.length === 0) && !isLoading) {
		return <span>No Facets</span>;
	}

	const components = {
		checkbox: Checkbox,
		search: Search,
	};

	return (
		<div>
			{searchResults &&
				searchResults.Facets.map(facet => {
					const Component = components[facet.FacetType];

					return (
						<Facet key={facet.FacetId} facet={facet}>
							{Component ? (
								<Component />
							) : (
								<div>
									{facet.FieldType} {facet.FacetType} is not implemented!
								</div>
							)}
						</Facet>
					);
				})}
		</div>
	);
}

export default FacetList;
