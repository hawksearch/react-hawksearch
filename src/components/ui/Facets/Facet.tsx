import React, { useContext, useState } from 'react';

import { Facet as FacetModel, Value } from 'models/Facets';
import { useHawkSearch } from 'components/StoreProvider';

const FacetContext = React.createContext({} as FacetContextValue);

export interface FacetProps {
	facet: FacetModel;
	children: React.ReactNode;
}

interface FacetContextValue {
	/** The facet model. */
	facet: FacetModel;

	/**
	 * An array of facet values for this facet. If this facet has a quick lookup search bar, this list
	 * will be filtered by this quick lookup.
	 */
	facetValues: Value[];

	/**
	 * An actor interface to perform actions for this facet.
	 */
	actor: FacetActor;
}

export interface FacetActor {
	/** Select the given facet value. */
	selectFacet(facetValue: Value): void;
	/** Selects and negates the given facet value. */
	negateFacet(facetValue: Value);
}

function Facet({ facet, children }: FacetProps) {
	const { actor: searchActor } = useHawkSearch();

	const [filter, setFilter] = useState('');

	function selectFacet(facetValue: Value) {
		setFilter('');
		searchActor.selectFacet(facet, facetValue);
	}

	function negateFacet(facetValue: Value) {
		setFilter('');
		searchActor.selectFacet(facet, facetValue, /* negate */ true);
	}

	const filteredFacets = facet.Values.filter(val => {
		if (!val.Label) {
			// if a facet value doesn't have a label, we can't really filter down to it
			// so exclude it
			return false;
		}

		return val.Label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
	});

	const actor = {
		selectFacet,
		negateFacet,
	};

	return (
		<FacetContext.Provider value={{ facet, actor, facetValues: filteredFacets }}>
			<div>
				<h4>{facet.Name}</h4>

				{facet.IsSearch && (
					<div>
						<input
							value={filter}
							onChange={e => setFilter(e.currentTarget.value)}
							type="text"
							placeholder="Quick Lookup"
						/>
					</div>
				)}

				{/* render listing component */}
				{children}
			</div>
		</FacetContext.Provider>
	);
}

export function useFacet() {
	return useContext(FacetContext);
}

export default Facet;
