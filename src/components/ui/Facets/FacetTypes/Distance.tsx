import React from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { FacetSelectionState } from 'store/Store';
import { Value } from 'models/Facets';

function Distance() {
	const { store, } = useHawksearch();
	const { facet,
		actor,
		state: { facetValues }
	} = useFacet();

	function setLinkFacet(value: Value | any, selectionState: number) {
		if (selectionState) {
			// Deselect the facet
			actor.selectFacet(value);
		} else {
			// Select the facet
			actor.setFacets([value]);
		}
	}
	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<ul className="hawk-facet-rail__facet-list">
					{facet.Ranges.map(rangeValue => {
						// facets can be selected or negated, so explicitly check that the facet is not selected
						const selectionState = store.isFacetSelected(facet, rangeValue.Value).state;
						const isSelected = selectionState !== FacetSelectionState.NotSelected;
						const findValues = facetValues.find(v => v.Value === rangeValue.Value ? v.Value === rangeValue.Value : '');

						return (
							<li key={rangeValue.Value} className="hawk-facet-rail__facet-list-item">
								<button
									onClick={e => setLinkFacet(rangeValue.Value, selectionState)}
									className={
										isSelected
											? 'hawk-facet-rail__facet-btn selected'
											: 'hawk-facet-rail__facet-btn'
									}
									aria-pressed={isSelected}
								>
									<span className="hawk-facet-rail__facet-name">
										{rangeValue.Label}
										{facet.ShowItemsCount && findValues ? ` (${findValues?.Count})` : ''}
									</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default Distance;
