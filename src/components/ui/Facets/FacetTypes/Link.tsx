import React from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { FacetSelectionState } from 'store/Store';
import { Value } from 'models/Facets';
import PlusCircleSVG from 'components/svg/PlusCircleSVG';
import DashCircleSVG from 'components/svg/DashCircleSVG';

function Link() {
	const { store } = useHawksearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	function setLinkFacet(value: Value, selectionState: number) {
		if (selectionState) {
			// Deselect the facet
			actor.selectFacet(value);
		} else {
			// Select the facet
			actor.setFacets([value]);
		}
	}

	function onValueSelected(facetValue: Value, isNegated: boolean) {
		isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<ul className="hawk-facet-rail__facet-list">
					{facetValues.map(value => {
						// facets can be selected or negated, so explicitly check that the facet is not selected
						const selectionState = store.isFacetSelected(facet, value, store.negativeFacetValuePrefix).state;

						const isSelected = selectionState !== FacetSelectionState.NotSelected;
						const isNegated = selectionState === FacetSelectionState.Negated;

						return (
							<li key={value.Value} className="hawk-facet-rail__facet-list-item">
								<button
									onClick={e => setLinkFacet(value, selectionState)}
									className={
										isSelected
											? 'hawk-facet-rail__facet-btn selected'
											: 'hawk-facet-rail__facet-btn'
									}
									aria-pressed={isSelected}
								>
									<span
										style={isNegated ? { textDecoration: 'line-through', color: 'black' } : undefined}
										className="hawk-facet-rail__facet-name"
									>
										{value.Label} {facet.ShowItemsCount ? `(${value.Count})` : ''}
									</span>
									<button
										onClick={e => {
											e.stopPropagation();
											onValueSelected(value, true);
										}}
										className="hawk-facet-rail__facet-btn-exclude"
										aria-describedby="visually-hidden"
									>
										{isNegated ? (
												<>
													<PlusCircleSVG class="hawk-facet-rail__facet-btn-include" />
													<span id="visually-hidden" className="visually-hidden">
														Include facet
													</span>
												</>
											) : (
												<>
													<DashCircleSVG />
													<span id="visually-hidden" className="visually-hidden">
														Exclude facet
													</span>
												</>
											)}
										</button>								
									</button>
							</li>
						);
					})}
				</ul>
			</div>

			{/* render the default truncation control as we don't need to customize this */}
			{renderer.renderTruncation()}
		</div>
	);
}

export default Link;
