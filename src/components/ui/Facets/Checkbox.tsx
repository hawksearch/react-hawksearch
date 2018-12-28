import React from 'react';

import { useFacet } from './Facet';
import { useHawkSearch } from 'components/StoreProvider';
import { FacetSelectionState } from 'store/Store';

function Checkbox() {
	const { store } = useHawkSearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	return (
		<div className="hawk__facet-rail__facet-values">
			<div className="hawk__facet-rail__facet-values__checkbox">
				<ul>
					{facetValues.map(value => {
						// facets can be selected or negated, so explicitly check that the facet is not selected
						const selectionState = store.isFacetSelected(facet, value).state;

						const isSelected = selectionState !== FacetSelectionState.NotSelected;
						const isNegated = selectionState === FacetSelectionState.Negated;

						return (
							<li key={value.Value}>
								{/*	todo: this should emulate the look of a checkbox (but still retain the functionality
									of a button) */}
								<div>{isSelected ? '[x]' : '[ ]'}</div>

								<button onClick={e => actor.selectFacet(value)} className="hawk__btn__select-facet">
									<span style={isNegated ? { textDecoration: 'line-through' } : undefined}>
										{value.Label} ({value.Count})
									</span>
								</button>

								<button onClick={e => actor.negateFacet(value)} className="hawk__btn__negate-facet">
									X <span className="visually-hidden">Negate facet</span>
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

export default Checkbox;
