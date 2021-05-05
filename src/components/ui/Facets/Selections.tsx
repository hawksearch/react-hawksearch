import React from 'react';
import moment from 'moment';
import { useHawksearch } from 'components/StoreProvider';
import XCircleSVG from 'components/svg/XCircleSVG';
import { ClientSelectionValue, ClientSelection } from 'store/ClientSelections';
import { Facet, Range } from 'models/Facets';

import { useTranslation } from 'react-i18next';

function Selections() {
	const {
		store: { facetSelections, pendingSearch },
		actor,
	} = useHawksearch();

	const { t, i18n } = useTranslation();

	// Added filter to hide selection for Tabs
	const keys = Object.keys(facetSelections).filter(key => key !== 'it');
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

	function renderRange(value: ClientSelectionValue, facet: Facet) {
		const displayValue = value.value;

		if (!displayValue || displayValue.indexOf(',') === -1) {
			// range facet selection values should include a comma, so if they don't then this likely isn't a valid
			// range value that we want to render
			const selectedRange = facet.Ranges.find((range: Range) => range.Value === value.value);
			return selectedRange ? selectedRange.Label : displayValue;
		}

		const splittedValues = displayValue.split(',');
		if (facet.IsCurrency && splittedValues.length > 1) {
			return `${facet.CurrencySymbol} ${splittedValues[0]} - ${facet.CurrencySymbol} ${splittedValues[1]}`;
		}

		// return a prettier display value for ranges
		return displayValue.replace(',', ' - ');
	}

	function renderLabel(selection, item) {
		if (selection.facet.FacetType === 'openRange' && selection.facet.DataType === 'datetime') {
			let [startDate, endDate] = (item.label || ',').split(',');
			startDate = moment(startDate.replace(/\//g, '-')).format('LLLL');
			endDate = moment(endDate.replace(/\//g, '-')).format('LLLL');
			return `${startDate} - ${endDate}`;
		} else if (selection.facet.FieldType === 'range') {
			return renderRange(item, selection.facet);
		} else if (selection.facet.FacetType === 'search') {
			return decodeURIComponent(item.label);
		}
		return item.label;
	}

	return (
		<div className="hawk-facet-rail__selections">
			<h4>{t("You've Selected")}</h4>
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
													{renderLabel(selection, item)}
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
						{t('Clear All')}
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Selections;
