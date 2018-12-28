import React, { useContext, useState } from 'react';

import { Facet as FacetModel, Value } from 'models/Facets';
import { useHawkSearch } from 'components/StoreProvider';

const FacetContext = React.createContext({} as FacetContextValue);

export interface FacetProps {
	facet: FacetModel;
	children: React.ReactNode;
}

interface FacetContextValue {
	/** The facet model returned from the server for this facet. */
	facet: FacetModel;

	/** Returns the state of the parent facet container. */
	state: FacetState;

	/** An actor interface to perform actions for this facet. */
	actor: FacetActor;

	renderer: FacetRenderer;
}

export interface FacetState {
	/**
	 * An array of facet values for this facet. If this facet has a quick lookup search bar, this list
	 * will be filtered by this quick lookup.
	 */
	facetValues: Value[];

	/**
	 * If the facet is configured for filtering, this is the user's entered filter value. Updated on
	 * immediately when the user types.
	 */
	filter: string;

	/** Whether or not this facet has its values truncated. */
	isTruncated: boolean;
	/** Whether or not this facet is collapsed. */
	isCollapsed: boolean;

	/** Whether or not this facet is configured to enable truncating. */
	shouldTruncate: boolean;
	/** Whether or not this facet is configured to enable filtering. */
	shouldSearch: boolean;

	/** If filter is enabled, contains the number of facets that are truncated. */
	remainingFacets: number;
}

export interface FacetActor {
	/** Select the given facet value. */
	selectFacet(facetValue: Value | string): void;
	/** Selects and negates the given facet value. */
	negateFacet(facetValue: Value | string): void;

	/** Sets the filter for this facet container. */
	setFilter(filter: string): void;

	/** Sets whether or not this facet is currently being truncated. */
	setTruncated(truncated: boolean): void;
	/** Sets whether or not this facet is currently collapsed. */
	setCollapsed(collapsed: boolean): void;
}

export interface FacetRenderer {
	renderTruncation();
}

function Facet({ facet, children }: FacetProps) {
	const { actor: searchActor } = useHawkSearch();

	// the facet does truncated listing of values if configured for truncating and we have too many facets
	const shouldTruncate = facet.DisplayType === 'truncating' && facet.Values.length > facet.TruncateThreshold;

	// the facet should have a search box if configured to do so, and the number of facet values is greater
	// than the threshold
	const shouldSearch = facet.IsSearch && facet.Values.length > facet.SearchThreshold;

	const [filter, setFilter] = useState('');
	const [isTruncated, setTruncated] = useState(shouldTruncate);
	const [isCollapsed, setCollapsed] = useState(facet.IsCollapsible && facet.IsCollapsedDefault);

	function selectFacet(facetValue: Value | string) {
		setFilter('');
		searchActor.toggleFacetValue(facet, facetValue);
	}

	function negateFacet(facetValue: Value | string) {
		setFilter('');
		searchActor.toggleFacetValue(facet, facetValue, /* negate */ true);
	}

	function renderTruncation() {
		/*	only show the toggle button if the facet is configured for truncation
			and we're not filtering */

		return (
			<>
				{shouldTruncate && !filter && (
					<div onClick={() => actor.setTruncated(!isTruncated)}>
						{isTruncated ? `(+) Show ${remainingFacets} More` : '(-) Show Less'}
					</div>
				)}
			</>
		);
	}

	let facetValues = facet.Values;

	// first, perform any filtering if enabled and a filter has been typed in
	if (shouldSearch && filter) {
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

	const actor: FacetActor = {
		selectFacet,
		negateFacet,

		setFilter,

		setTruncated,
		setCollapsed,
	};

	const state: FacetState = {
		facetValues,

		filter,

		isTruncated,
		isCollapsed,

		shouldTruncate,
		shouldSearch,

		remainingFacets,
	};

	const renderer: FacetRenderer = {
		renderTruncation,
	};

	return (
		<FacetContext.Provider value={{ facet, state, actor, renderer }}>
			<div className="hawk__facet-rail__facet">
				<div className="hawk__facet-rail__facet-heading" onClick={() => setCollapsed(!isCollapsed)}>
					<h4>{facet.Name}</h4>

					<span>{isCollapsed ? '+' : '-'}</span>
				</div>

				{!isCollapsed && (
					<>
						{shouldSearch && (
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
						{children}
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
