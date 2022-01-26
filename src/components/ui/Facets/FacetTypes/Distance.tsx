import React from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { FacetSelectionState } from 'store/Store';
import { Value } from 'models/Facets';

function Distance(){
    const {store} = useHawksearch();
    const {
		facet,
		// state: { facetValues },
		actor,
		// renderer,
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
					{facet.Ranges.map(value => {
						// facets can be selected or negated, so explicitly check that the facet is not selected                            
                        const selectionState = store.isFacetSelected(facet, value.Value).state;

						const isSelected = selectionState !== FacetSelectionState.NotSelected;

						return (
							<li key={value.Value} className="hawk-facet-rail__facet-list-item">
								<button
									onClick={e => setLinkFacet(value.Value, selectionState)}
									className={
										isSelected
											? 'hawk-facet-rail__facet-btn selected'
											: 'hawk-facet-rail__facet-btn'
									}
									aria-pressed={isSelected}
								>
									<span className="hawk-facet-rail__facet-name">
										{value.Label} {facet.ShowItemsCount ? `(${value.Value})` : ''}
									</span>
								</button>
							</li>
						);

					})}
				</ul>
			</div>

			{/* render the default truncation control as we don't need to customize this
			{renderer.renderTruncation()} */}
		</div>
	);

}

export default Distance;