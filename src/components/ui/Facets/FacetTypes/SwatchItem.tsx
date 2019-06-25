import React, { useState } from 'react';

import { Value } from 'models/Facets/Value';
import { Swatch } from 'models/Facets';
import { useHawkConfig } from 'components/ConfigProvider';

export interface SwatchItemProps {
	swatchValue: Value;
	facetSwatch: Swatch;
	isNegated: boolean;
	isSelected: boolean;
	isColor: boolean;
	onSwatchSelected(facetValue: string, isNegated: boolean): void;
}

function SwatchItem(item: SwatchItemProps) {
	const { config } = useHawkConfig();

	const facetValue = item.swatchValue.Value || '';

	// facets can be selected or negated, so explicitly check that the facet is not selected
	const swatchUrl =
		config.dashboardUrl + (!item.facetSwatch.AssetUrl ? item.facetSwatch.AssetName : item.facetSwatch.AssetUrl);

	const colorSwatchStyle = {
		backgroundColor: item.facetSwatch.Color,
	};

	const listItemClassNames =
		'hawk-facet-rail__facet-list-item' +
		(item.isSelected ? ' hawkFacet-active' : '') +
		(item.isNegated ? ' hawkFacet-negative' : '');

	return (
		<li key={item.facetSwatch.Value} className={listItemClassNames}>
			<button
				onClick={e => item.onSwatchSelected(facetValue, false)}
				className="hawk-facet-rail__facet-btn hawk-styleSwatch"
				aria-pressed={item.isSelected}
			>
				<span className="hawk-selectionInner">
					{item.isColor ? (
						<span className="hawk-swatchColor" style={colorSwatchStyle} title={item.facetSwatch.Value} />
					) : (
						<img src={swatchUrl} alt={item.facetSwatch.Value} />
					)}
				</span>
			</button>
			<button className="hawk-negativeIcon">
				<i className="hawkIcon-blocked" onClick={e => item.onSwatchSelected(facetValue, true)} />
			</button>
		</li>
	);
}

export default SwatchItem;
