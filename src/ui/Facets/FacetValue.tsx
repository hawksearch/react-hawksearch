import React from 'react';

import { Facet, Value } from 'models/Facets';
import { useHawkSearch } from 'store/Store';

export interface FacetValueProps {
	facet: Facet;
	value: Value;
}

function FacetValue({ facet, value }: FacetValueProps) {
	const {
		store: {
			pendingSearch: { FacetSelections: currentFacetSelections },
		},
		actor,
	} = useHawkSearch();

	function onFacetClicked() {
		const facetName = facet.ParamName ? facet.ParamName : facet.Field;

		if (!value.Value) {
			console.error(`Facet ${facet.Name} (${facet.Field}) has no facet value for ${value.Label}`);
			return;
		}

		if (
			currentFacetSelections &&
			currentFacetSelections[facetName] &&
			currentFacetSelections[facetName].indexOf(value.Value) !== -1
		) {
			// if the facet is currently selected, we want to unselect it

			// facets can have multiple values selected, so we need to exclude it from the facet array
			const currentFacetValues = currentFacetSelections[facetName];

			currentFacetValues.splice(currentFacetValues.indexOf(value.Value), 1);

			if (currentFacetValues.length === 0) {
				// if this removal means we have no more facet values, the entire facet selection goes away
				const { [facetName]: _, ...newFacetSelections } = currentFacetSelections;

				actor.setSearch({ FacetSelections: newFacetSelections });
			} else {
				const newFacetSelections = { ...currentFacetSelections, [facetName]: currentFacetValues };

				actor.setSearch({ FacetSelections: newFacetSelections });
			}
		} else {
			// add this facet as a selection

			if (currentFacetSelections && currentFacetSelections[facetName]) {
				const currentFacetValues = currentFacetSelections[facetName];

				const newFacetSelections = {
					...currentFacetSelections,
					[facetName]: [...currentFacetValues, value.Value],
				};

				actor.setSearch({ FacetSelections: newFacetSelections });
			} else {
				const newFacetSelections = {
					...currentFacetSelections,
					[facetName]: [value.Value],
				};

				actor.setSearch({ FacetSelections: newFacetSelections });
			}
		}
	}

	return (
		<li onClick={onFacetClicked}>
			{value.Label} ({value.Count})
		</li>
	);
}

export default FacetValue;
