import React, { useState } from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { FacetSelectionState } from 'store/Store';
import SizeItem from './SizeItem';
import Singleton from 'components/Singleton';

function Size() {
	const { store } = useHawksearch();
	const {
		facet,
		actor,
		state: { facetValues },
	} = useFacet();

	function onSwatchSelected(facetValue: string, isNegated: boolean) {
		Singleton.track('searchtracking', {
			trackingId: store.searchResults ? store.searchResults.TrackingId : '',
			typeId: 2,
		});
		isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
	}
	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-size">
				<ul className="hawk-facet-rail__facet-list col-sm-8">
					{facet.Values &&
						facetValues.map(value => {
							const selectionState = store.isFacetSelected(facet, value).state;
							const isNegated = selectionState === FacetSelectionState.Negated;
							return (
								<SizeItem
									key={value.Value}
									size={{ ...value, Value: value.Value || '', Label: value.Label || '' }}
									onSwatchSelected={onSwatchSelected}
									isNegated={isNegated}
								/>
							);
						})}
				</ul>
			</div>
		</div>
	);
}

export default Size;
