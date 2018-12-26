import React, { useState } from 'react';

import { useFacet } from './Facet';
import { useHawkSearch } from 'components/StoreProvider';
import { FacetSelectionState } from 'store/Store';

function Checkbox() {
	const { store } = useHawkSearch();
	const { facet, facetValues, actor } = useFacet();

	return (
		<ul>
			{facetValues.map(value => {
				// facets can be selected or negated, so explicitly check that the facet is not selected
				const selectionState = store.isFacetSelected(facet, value).state;

				const isSelected = selectionState !== FacetSelectionState.NotSelected;
				const isNegated = selectionState === FacetSelectionState.Negated;

				return (
					<li key={value.Value}>
						{isSelected ? '[x]' : '[ ]'}

						<button onClick={e => actor.selectFacet(value)}>
							<span style={isNegated ? { textDecoration: 'line-through' } : undefined}>
								{value.Label}
							</span>
						</button>

						<button onClick={e => actor.negateFacet(value)}>
							X <span className="visually-hidden">Negate facet</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}

export default Checkbox;
