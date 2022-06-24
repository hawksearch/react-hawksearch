import React from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { FacetSelectionState } from 'store/Store';
import { Facet as Value } from 'models/Facets';

function Distance() {
	const { store } = useHawksearch();
	const {
		facet,
		actor,
		renderer,
		state: { facetValues },
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

	function renderOptions() {
		return (
			<div className="hawk-facet-rail__facet-values">
				<div className="hawk-facet-rail__facet-values-link">
					<ul className="hawk-facet-rail__facet-list">
						{facetValues.map(values => {
							// facets can be selected or negated, so explicitly check that the facet is not selected
							const selectionState = store.isFacetSelected(facet, values, store.negativeFacetValuePrefix).state;
							const isSelected = selectionState !== FacetSelectionState.NotSelected;
							return (
								<li key={values.Value} className="hawk-facet-rail__facet-list-item">
									{
										<button
											onClick={e => setLinkFacet(values.Value, selectionState)}
											className={
												isSelected
													? 'hawk-facet-rail__facet-btn selected'
													: 'hawk-facet-rail__facet-btn'
											}
											aria-pressed={isSelected}
										>
											<span className="hawk-facet-rail__facet-name">
												{values.Label}
												{facet.ShowItemsCount ? ` (${values?.Count})` : ''}
											</span>
										</button>
									}
								</li>
							);
						})}
					</ul>
				</div>
				{/* render the default truncation control as we don't need to customize this */}
				{/* {renderer.renderTruncation()} */}
			</div>
		);

	}
	function getScrollHeight(scrollHeight: number) {
		console.log("facetResults====>", facet.ScrollThreshold);
		
		if (scrollHeight === 0) {
			return { height: 'inherit' };
		}
		return { height: scrollHeight, overflow: 'auto' };
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<ul className="hawk-facet-rail__facet-list" style={getScrollHeight(facet.ScrollHeight)}>
					{renderOptions()}
				</ul>
			</div>

			{/* render the default truncation control as we don't need to customize this */}
			{renderer.renderTruncation()}
		</div>
	);
}

export default Distance;
