import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';
import { FacetSelectionState } from 'store/Store';
import DashCircleSVG from 'components/svg/DashCircleSVG';
import CheckmarkSVG from 'components/svg/CheckmarkSVG';
import PlusCircleSVG from 'components/svg/PlusCircleSVG';

function Swatch() {
	const { store } = useHawkSearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-swatch">
				<ul className="hawk-facet-rail__facet-list">
					{facet.SwatchData &&
						facetValues.map(value => {
							const facetValue = value.Value || '';
							// find swatch that is corresponding with value
							const facetSwatch =
								facet.SwatchData &&
								facet.SwatchData.find(s => s.Value.toLowerCase() === facetValue.toLowerCase());
							if (!facetSwatch) {
								return;
							}
							// facets can be selected or negated, so explicitly check that the facet is not selected
							// TODO: currently API doesn't return values for negated colors
							//const isNegated = selectionState === FacetSelectionState.Negated;
							const selectionState = store.isFacetSelected(facet, value).state;
							const assetFolder = '/assets/38'; // 38 is databaseId - I don't know how to get this at this moment
							const isSelected = selectionState !== FacetSelectionState.NotSelected;

							const isColor = !!facetSwatch.Color;
							const swatchUrl =
								'http://test.hawksearch.net/' +
								(!facetSwatch.AssetUrl
									? assetFolder + '/' + facetSwatch.AssetName
									: facetSwatch.AssetUrl);

							const colorSwatchStyle = {
								backgroundColor: facetSwatch.Color,
							};

							const listItemClassNames =
								'hawk-facet-rail__facet-list-item' + (isSelected ? ' hawkFacet-active' : '');

							return (
								<li key={value.Value} className={listItemClassNames}>
									<button
										onClick={e => actor.selectFacet(value)}
										className="hawk-facet-rail__facet-btn hawk-styleSwatch"
										aria-pressed={isSelected}
									>
										<span className="hawk-selectionInner">
											{isColor ? (
												<span
													className="hawk-swatchColor"
													style={colorSwatchStyle}
													title={value.Value}
												/>
											) : (
												<img src={swatchUrl} alt={value.Value} />
											)}
										</span>
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

export default Swatch;
