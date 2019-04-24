import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Switch from 'react-switch';

import 'rheostat/initialize';

import StoreProvider, { useHawkSearch } from 'components/StoreProvider';
import ConfigProvider from 'components/ConfigProvider';
import QueryStringListener from 'components/QueryStringListener';
import { parseLocation } from 'util/QueryString';
import { HawkSearchConfig } from 'HawkSearch';
import { ResultItemProps } from 'components/ui/Results/ResultItem';
import SearchBox from 'components/ui/SearchBox';
import { FacetRail, useFacet } from 'components/ui/Facets';
import { Results } from 'components/ui/Results';
import ResultImage from 'components/ui/Results/ResultImage';
import { FacetSelectionState } from 'store/Store';
import { FacetComponent } from 'types/FacetComponent';
import { FacetType } from 'models/Facets/FacetType';

import 'styles/app.scss';

export function initializeSearch(elementId: string, hawkConfig: HawkSearchConfig) {
	// pull the initial search from location
	const searchRequest = parseLocation(location);

	ReactDOM.render(
		<ConfigProvider config={hawkConfig}>
			<StoreProvider initialSearch={searchRequest}>
				<QueryStringListener />
				<div className="hawk">
					<div className="hawk__header">
						<SearchBox />
					</div>
					<div className="hawk__body">
						<FacetRail />
						<Results ResultItem={CustomItemWithPrice} />
					</div>
				</div>
			</StoreProvider>
		</ConfigProvider>,
		document.getElementById(elementId)
	);
}

function CustomItemWithPrice({ item }: ResultItemProps) {
	const price = parseFloat(item.getDocumentValue('price') || '');
	return (
		<div className="hawk-results__item">
			<ResultImage item={item} />
			<div className="hawk-results__item-name">
				<span>{item.getDocumentValue('itemname')}</span>
			</div>
			<div className="hawk-results__item-name">
				<span>
					Price :
					{new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
					}).format(price)}
				</span>
			</div>
		</div>
	);
}

function CustomSwitch() {
	const { store } = useHawkSearch();
	const {
		facet,
		state: { facetValues },
		actor,
	} = useFacet();

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-checkbox">
				<ul className="hawk-facet-rail__facet-list">
					{facetValues.map(value => {
						// facets can be selected or negated, so explicitly check that the facet is not selected
						const selectionState = store.isFacetSelected(facet, value).state;

						const isSelected = selectionState !== FacetSelectionState.NotSelected;
						const isNegated = selectionState === FacetSelectionState.Negated;

						return (
							<li key={value.Value} className="hawk-facet-rail__facet-list-item">
								<label>
									<Switch
										onChange={e =>
											isNegated ? actor.negateFacet(value) : actor.selectFacet(value)
										}
										checked={isSelected}
									/>
									<span
										style={isNegated ? { textDecoration: 'line-through' } : undefined}
										className="hawk-facet-rail__facet-name"
									>
										{value.Label} ({value.Count})
									</span>
								</label>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

const overridedComponents: FacetComponent[] = [{ facetType: FacetType.Checkbox, component: CustomSwitch }];

initializeSearch('app', {
	clientGuid: 'f51060e1c38446f0bacdf283390c37e8',
	searchPageUrl: 'search.html',
	facetOverrides: overridedComponents,
});
