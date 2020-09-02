import React from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { FacetSelectionState } from 'store/Store';
import TrackingEvent from 'components/TrackingEvent';

function Link() {
	const { store } = useHawksearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<ul className="hawk-facet-rail__facet-list">
					{facetValues.map(value => {
						// facets can be selected or negated, so explicitly check that the facet is not selected
						const selectionState = store.isFacetSelected(facet, value).state;

						const isSelected = selectionState !== FacetSelectionState.NotSelected;

						return (
							<li key={value.Value} className="hawk-facet-rail__facet-list-item">
								<button
									onClick={e => {
										TrackingEvent.track('searchtracking', {
											trackingId: store.searchResults ? store.searchResults.TrackingId : '',
											typeId: 2,
										});
										actor.selectFacet(value);
									}}
									className="hawk-facet-rail__facet-btn"
									aria-pressed={isSelected}
								>
									<span className="hawk-facet-rail__facet-name">
										{value.Label} ({value.Count})
									</span>
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
