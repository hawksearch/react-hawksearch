import React, { useState } from 'react';

import { useHawkSearch } from '../../StoreProvider';
import Facet from './Facet';
import { Checkbox, Search, Link, Slider } from './FacetTypes';
import PlaceholderFacet from './PlaceholderFacet';
import Swatch from './FacetTypes/Swatch';

function FacetList() {
	const {
		store: { searchResults },
	} = useHawkSearch();

	// the number of random placeholders to render while we wait for results
	const [numPlaceholders] = useState(Math.round(Math.random() * (5 - 3) + 3));

	const components = {
		checkbox: Checkbox,
		search: Search,
		link: Link,
		slider: Slider,
		swatch: Swatch
	};

	return (
		<div className="hawk-facet-rail__facet-list">
			{searchResults
				? // if there are search results, render the facets
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
				})
				: // otherwise render a couple placeholders
				[...Array(numPlaceholders)].map((_, i) => <PlaceholderFacet key={i} />)}
		</div>
	);
}

export default FacetList;
