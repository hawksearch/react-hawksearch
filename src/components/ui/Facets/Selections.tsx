import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { SelectionFacetValue } from 'models/Search';

function Selections() {
	const { actor } = useHawkSearch();

	const selections = actor.getFacetSelections();

	const keys = Object.keys(selections);

	if (keys.length === 0) {
		// no selections, so render nothing
		return null;
	}

	function clearSelection(facet: string, value: SelectionFacetValue) {
		// since this facet is already selected, selecting it again will clear it
		actor.selectFacet(facet, value.Value);
	}

	return (
		<div style={{ borderBottom: '1px solid black' }}>
			<span>You've Selected</span>

			<ul>
				{keys.map(key => {
					const selection = selections[key];

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
