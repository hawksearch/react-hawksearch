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

	// the facet does truncated listing of values if configured for truncating and we have too many facets
	const shouldTruncate =
		facet.DisplayType === 'truncating' &&
		facet.Values.length > facet.TruncateThreshold &&
		facet.TruncateThreshold > 0;

	const [filter, setFilter] = useState('');
	const [isTruncated, setTruncated] = useState(shouldTruncate);
	const [isCollapsed, setCollapsed] = useState(facet.IsCollapsible && facet.IsCollapsedDefault);

	function selectFacet(facetValue: Value) {
		setFilter('');
		searchActor.selectFacet(facet, facetValue);
	}

	function negateFacet(facetValue: Value) {
		setFilter('');
		searchActor.selectFacet(facet, facetValue, /* negate */ true);
	}

	let facetValues = facet.Values;

	// first, perform any filtering if enabled and a filter has been typed in
	if (facet.IsSearch && filter) {
		facetValues = facet.Values.filter(val => {
			if (!val.Label) {
				// if a facet value doesn't have a label, we can't really filter down to it
				// so exclude it
				return false;
			}

			return val.Label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
		});
	}

	// next, handle truncation
	let remainingFacets = 0;

	if (shouldTruncate && isTruncated) {
		const valuesBeforeTrunc = facetValues.length;

		facetValues = facetValues.slice(0, facet.TruncateThreshold);

		remainingFacets = valuesBeforeTrunc - facet.TruncateThreshold;
	}

	const actor = {
		selectFacet,
		negateFacet,
	};

	return (
		<FacetContext.Provider value={{ facet, actor, facetValues }}>
			<div className="hawk__facet-rail__facet">
				<div className="hawk__facet-rail__facet-heading" onClick={() => setCollapsed(!isCollapsed)}>
					<h4>{facet.Name}</h4>
					<span>{isCollapsed ? '+' : '-'}</span>
				</div>

				{!isCollapsed && (
					<>
						{facet.IsSearch && (
							<div className="hawk__facet-rail__facet__quick-lookup">
								<input
									value={filter}
									onChange={e => setFilter(e.currentTarget.value)}
									type="text"
									placeholder="Quick Lookup"
								/>
							</div>
						)}

						{/* render listing component */}
						<div className="hawk__facet-rail__facet-values">
							{children}

							{/*	only show the toggle button if the facet is configured for truncation
						and we're not filtering */}
							{shouldTruncate && !filter && (
								<div onClick={() => setTruncated(!isTruncated)}>
									{isTruncated ? `(+) Show ${remainingFacets} More` : '(-) Show Less'}
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</FacetContext.Provider>
	);
}

export function useFacet() {
	return useContext(FacetContext);
}

export default Facet;
