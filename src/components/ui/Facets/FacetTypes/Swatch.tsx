import React, { useState } from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { FacetSelectionState } from 'store/Store';
import SwatchItem from './SwatchItem';

function Swatch() {
	const { store } = useHawksearch();
	const {
		facet,
		actor,
		state: { facetValues },
		renderer,
	} = useFacet();

	function onSwatchSelected(facetValue: string, isNegated: boolean) {
		isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-swatch">
				<ul className="hawk-facet-rail__facet-list">
					{facet.SwatchData &&
						facetValues.map(value => {
							const facetValue = value.Value || '';
							// find swatch that is corresponding with value
							const facetSwatch =
								facet.SwatchData &&
								facet.SwatchData.find(s => s.Value.toLowerCase() === facetValue.toLowerCase());
							if (!facetSwatch) {
								return;
							}
							const selectionState = store.isFacetSelected(facet, value).state;
							const isNegated = selectionState === FacetSelectionState.Negated;
							const isSelected = selectionState !== FacetSelectionState.NotSelected;

							const isColor = !!facetSwatch.Color;
							return (
								<SwatchItem
									key={facetValue}
									swatchValue={value}
									facetSwatch={facetSwatch}
									isSelected={isSelected}
									isColor={isColor}
									isNegated={isNegated}
									onSwatchSelected={onSwatchSelected}
								/>
							);
						})}
				</ul>
			</div>

			{/* render the default truncation control as we don't need to customize this */}
			{renderer.renderTruncation()}
		</div>
	);
}

export default Swatch;
