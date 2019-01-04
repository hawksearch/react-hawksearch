import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { SelectionFacetValue } from 'models/Search';
import XCircleSVG from 'components/svg/XCircleSVG';

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
		<div className="hawk-facet-rail__selections">
			<h4>You've Selected</h4>

			<ul className="hawk-selections">
				{keys.map(key => {
					const selection = facetSelections[key];

					return (
						<li key={key} className="hawk-selections__category">
							<span className="hawk-selections__category-name">{selection.Label}</span>

							<ul className="hawk-selections__item-list">
								{selection.Items.map(item => {
									const negation = item.Value.startsWith('-');

									return (
										<li key={item.Value} className="hawk-selections__item">
											<span
												className={
													negation
														? 'hawk-selections__item-name hawk-selections__item-name--negated'
														: 'hawk-selections__item-name'
												}
											>
												{item.Label}
											</span>

											<button
												onClick={() => clearSelection(key, item)}
												className="hawk-selections__item-remove"
											>
												<XCircleSVG /> <span className="visually-hidden">Clear facet</span>
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
