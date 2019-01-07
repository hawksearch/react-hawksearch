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

			<ul className="hawk-selections">
				{keys.map(key => {
					const selection = facetSelections[key];

					return (
						<li key={key} className="hawk-selections__category">
							<div className="hawk-selections__category-name-wrapper">
								<button onClick={() => clearSelection(key)} className="hawk-selections__item-remove">
									<XCircleSVG />{' '}
									<span className="visually-hidden">Unselect all facets for {selection.Label}</span>
								</button>

								<span className="hawk-selections__category-name">{selection.Label}</span>
							</div>

							<ul className="hawk-selections__item-list">
								{selection.Items.map(item => {
									const negation = item.Value.startsWith('-');

									return (
										<li key={item.Value} className="hawk-selections__item">
											<button
												onClick={() => clearSelection(key, item)}
												className="hawk-selections__item-remove"
											>
												<XCircleSVG />
												<span className="visually-hidden">
													Unselect facet {selection.Label} {item.Label}
												</span>
											</button>

											<span
												className={
													negation
														? 'hawk-selections__item-name hawk-selections__item-name--negated'
														: 'hawk-selections__item-name'
												}
											>
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
				<button onClick={clearAll} className="hawk-btn">
					Clear All
				</button>
			</div>
		</div>
	);
}

export default Selections;
