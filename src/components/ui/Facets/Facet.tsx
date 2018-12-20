import React, { useContext } from 'react';

import { Facet as FacetModel, Value as FacetValue } from 'models/Facets';
import { useHawkSearch } from 'components/StoreProvider';

const FacetContext = React.createContext({} as FacetContextValue);

export interface FacetProps {
	facet: FacetModel;

	children: React.ReactNode;
}

interface FacetContextValue {
	facet: FacetModel;

	actor: FacetActor;
}

export interface FacetActor {
	selectFacet(facetValue: FacetValue): void;
}

function Facet({ facet, children }: FacetProps) {
	const {
		store: {
			pendingSearch: { FacetSelections: currentFacetSelections },
		},
		actor,
	} = useHawkSearch();

	function selectFacet(facetValue: FacetValue) {
		const facetName = facet.ParamName ? facet.ParamName : facet.Field;

		if (!facetValue.Value) {
			console.error(`Facet ${facet.Name} (${facet.Field}) has no facet value for ${facetValue.Label}`);
			return;
		}

		if (
			currentFacetSelections &&
			currentFacetSelections[facetName] &&
			currentFacetSelections[facetName].indexOf(facetValue.Value) !== -1
		) {
			// if the facet is currently selected, we want to unselect it

			// facets can have multiple values selected, so we need to exclude it from the facet array
			const currentFacetValues = currentFacetSelections[facetName];

			currentFacetValues.splice(currentFacetValues.indexOf(facetValue.Value), 1);

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
					[facetName]: [...currentFacetValues, facetValue.Value],
				};

				actor.setSearch({ FacetSelections: newFacetSelections });
			} else {
				const newFacetSelections = {
					...currentFacetSelections,
					[facetName]: [facetValue.Value],
				};

				actor.setSearch({ FacetSelections: newFacetSelections });
			}
		}
	}

	return <FacetContext.Provider value={{ facet, actor: { selectFacet } }}>{children}</FacetContext.Provider>;
}

export function useFacet() {
	return useContext(FacetContext);
}

export default Facet;
