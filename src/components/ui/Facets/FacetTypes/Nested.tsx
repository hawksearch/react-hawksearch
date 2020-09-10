import React from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { FacetSelectionState } from 'store/Store';
import { useFacet } from 'components/ui/Facets/Facet';
import NestedItem from './NestedItem';
import { Value } from 'models/Facets/Value';

function Nested() {
	const { store } = useHawksearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	function onValueSelected(facetValue: Value, isNegated: boolean) {
		isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-checkbox">
				<ul className="hawk-facet-rail__facet-list">
					{facetValues.map(value => {
						// facets can be selected or negated, so explicitly check that the facet is not selected
						const selectionState = store.isFacetSelected(facet, value).state;

						const isSelected = selectionState !== FacetSelectionState.NotSelected;
						const isNegated = selectionState === FacetSelectionState.Negated;

						return (
							<NestedItem
								key={value.Value}
								hierarchyValue={value}
								isSelected={isSelected}
								isNegated={isNegated}
								onValueSelected={onValueSelected}
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

export default Nested;
