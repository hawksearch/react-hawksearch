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

	function clearSelection(facet: string, value?: SelectionFacetValue) {
		if (value) {
			actor.clearFacetValue(facet, value.Value);
		} else {
			actor.clearFacet(facet);
		}
	}

	function clearAll() {
		actor.clearAllFacets();
	}

	return (
		<div className="hawk-facet-rail__selections">
			<h4>You've Selected</h4>

			<ul>
				{keys.map(key => {
					const selection = facetSelections[key];

					return (
						<li key={key}>
							<button onClick={() => clearSelection(key)}>
								X<span className="visually-hidden">Unselect all facets for {selection.Label}</span>
							</button>
							<span>{selection.Label}</span>

							<ul>
								{selection.Items.map(item => {
									const negation = item.Value.startsWith('-');

									return (
										<li key={item.Value}>
											<button onClick={() => clearSelection(key, item)}>
												X
												<span className="visually-hidden">
													Unselect facet {selection.Label} {item.Label}
												</span>
											</button>

											<span style={negation ? { textDecoration: 'line-through' } : undefined}>
												{item.Label}
											</span>
										</li>
									);
								})}
							</ul>
						</li>
					);
				})}
			</ul>

			<div>
				<button onClick={clearAll}>Clear All</button>
			</div>
		</div>
	);
}

export default Selections;
