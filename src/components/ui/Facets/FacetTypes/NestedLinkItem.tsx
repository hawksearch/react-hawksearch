import React, { useState } from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { FacetSelectionState } from 'store/Store';
import { useFacet } from 'components/ui/Facets/Facet';
import { Value } from 'models/Facets';
export interface NestedLinkItemProps {
	hierarchyValue: Value;
	isNegated: boolean;
	isSelected: boolean;
	onValueSelected(facetValue: Value, isNegated: boolean): void;
}

function NestedLinkItem(item: NestedLinkItemProps) {
	const { store } = useHawksearch();
	const { facet } = useFacet();

	const [isExpanded, setIsExpanded] = useState(false);
	const [isTruncated, setIsTruncated] = useState(facet.shouldTruncate);

	const hierarchyValue = item.hierarchyValue || '';
	let hierarchyChildren = item.hierarchyValue.Children || [];

	let remainingValues = 0;

	const shouldTruncateChildren =
		facet.DisplayType === 'truncating' && hierarchyChildren.length > facet.TruncateThreshold;

	if (shouldTruncateChildren && isTruncated) {
		const valuesBeforeTrunc = hierarchyChildren.length;

		hierarchyChildren = hierarchyChildren.slice(0, facet.TruncateThreshold);

		remainingValues = valuesBeforeTrunc - facet.TruncateThreshold;
	}

	function renderChildTruncation() {
		return (
			<>
				{shouldTruncateChildren && (
					<li className="hawk-facet-rail__facet-list-item hawk-show-more">
						<button onClick={() => setIsTruncated(!isTruncated)} className="hawk-facet-rail__show-more-btn">
							{isTruncated ? `(+) Show ${remainingValues} More` : '(-) Show Less'}
						</button>
					</li>
				)}
			</>
		);
	}

	return (
		<li className="hawk-facet-rail__facet-list-item hawkFacet-group">
			<div className="hawkFacet-group__inline">
				<button
					onClick={() => item.onValueSelected(hierarchyValue, false)}
					className="hawk-facet-rail__facet-btn"
					aria-pressed={item.isSelected}
				>
					<span
						style={item.isNegated ? { textDecoration: 'line-through' } : undefined}
						className={
							item.isSelected ? 'hawk-facet-rail__facet-name checked' : 'hawk-facet-rail__facet-name'
						}
					>
						{item.hierarchyValue.Label} ({item.hierarchyValue.Count})
					</span>
				</button>
				{hierarchyChildren.length > 0 ? (
					<button
						className={
							isExpanded
								? 'hawk-collapseState hawk-linklist'
								: 'hawk-collapseState hawk-linklist collapsed'
						}
						aria-expanded="false"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						&nbsp;
					</button>
				) : null}
			</div>
			{isExpanded && hierarchyChildren ? (
				<div className="hawk-facet-rail__w-100">
					<ul className="hawkFacet-group-inside">
						{hierarchyChildren.map(value => {
							const selectionState = store.isFacetSelected(facet, value).state;
							const isNegated = selectionState === FacetSelectionState.Negated;
							const isSelected = selectionState !== FacetSelectionState.NotSelected;
							return (
								<NestedLinkItem
									key={value.Path}
									hierarchyValue={value}
									isSelected={isSelected}
									isNegated={isNegated}
									onValueSelected={item.onValueSelected}
								/>
							);
						})}
						{renderChildTruncation()}
					</ul>
				</div>
			) : (
				<></>
			)}
		</li>
	);
}

export default NestedLinkItem;
