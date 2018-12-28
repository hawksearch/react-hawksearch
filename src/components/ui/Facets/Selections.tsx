import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { SelectionFacetValue } from 'models/Search';

function Selections() {
	const {
		store: { facetSelections },
		actor,
	} = useHawkSearch();

	const keys = Object.keys(facetSelections);

	if (keys.length === 0) {
		// no selections, so render nothing
		return null;
	}

	function clearSelection(facet: string, value: SelectionFacetValue) {
		actor.clearFacetValue(facet, value.Value);
	}

	return (
		<div style={{ borderBottom: '1px solid black' }}>
			<span>You've Selected</span>

			<ul>
				{keys.map(key => {
					const selection = facetSelections[key];

					return (
						<li key={key}>
							<span>{selection.Label}</span>

							<ul>
								{selection.Items.map(item => {
									const negation = item.Value.startsWith('-');

									return (
										<li key={item.Value}>
											<span style={negation ? { textDecoration: 'line-through' } : undefined}>
												{item.Label}
											</span>

											<button onClick={() => clearSelection(key, item)}>
												X <span className="visually-hidden">Clear facet</span>
											</button>
										</li>
									);
								})}
							</ul>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Selections;
