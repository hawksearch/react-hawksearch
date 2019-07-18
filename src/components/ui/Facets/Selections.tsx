import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import XCircleSVG from 'components/svg/XCircleSVG';
import { ClientSelectionValue, ClientSelection } from 'store/ClientSelections';

function Selections() {
	const {
		store: { facetSelections, pendingSearch },
		actor,
	} = useHawkSearch();

	const keys = Object.keys(facetSelections);

	if (keys.length === 0) {
		// no selections, so render nothing
		return null;
	}

	function clearSelection(facet: string, value?: ClientSelectionValue) {
		if (value) {
			actor.clearFacetValue(facet, value.value);
		} else {
			actor.clearFacet(facet);
		}
	}

	function clearAll() {
		actor.clearAllFacets();
	}

	function renderRange(value: ClientSelectionValue) {
		const displayValue = value.value;

		if (!displayValue || displayValue.indexOf(',') === -1) {
			// range facet selection values should include a comma, so if they don't then this likely isn't a valid
			// range value that we want to render
			return displayValue;
		}

		// return a prettier display value for ranges
		return displayValue.replace(',', ' - ');
	}

	return (
		<div className="hawk-facet-rail__selections">
			<h4>You've Selected</h4>
			<ul className="hawk-selections">
				{keys.map(key => {
					const selection = facetSelections[key];

					return (
						<li key={key} className="hawk-selections__category">
							<div className="hawk-selections__category-wrapper">
								<span className="hawk-selections__category-name">{selection.label}:</span>

								<ul className="hawk-selections__item-list">
									{selection.items.map(item => {
										const negation = item.value.startsWith('-');

										return (
											<li key={item.value} className="hawk-selections__item">
												<button
													onClick={() => clearSelection(key, item)}
													className="hawk-selections__item-remove"
												>
													<XCircleSVG />
													<span className="visually-hidden">
														Unselect facet {selection.label} {item.label}
													</span>
												</button>

												<span
													className={
														negation
															? 'hawk-selections__item-name hawk-selections__item-name--negated'
															: 'hawk-selections__item-name'
													}
												>
													{selection.facet.FieldType === 'range'
														? // render ranges in a specific way
														  renderRange(item)
														: // other facets can have their labels rendered directly
														  item.label}
												</span>
											</li>
										);
									})}
								</ul>
							</div>

							<button onClick={() => clearSelection(key)} className="hawk-selections__category-remove">
								<XCircleSVG />{' '}
								<span className="visually-hidden">Unselect all facets for {selection.label}</span>
							</button>
						</li>
					);
				})}

				<li className="hawk-selections__category">
					<button onClick={clearAll} className="hawk-btn hawk-btn-primary-outline">
						Clear All
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Selections;
