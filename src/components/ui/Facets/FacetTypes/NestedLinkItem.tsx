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
					onClick={() => (hierarchyChildren.length <= 0 ? item.onValueSelected(hierarchyValue, false) : null)}
					className="hawk-facet-rail__facet-btn"
					aria-pressed={item.isSelected}
				>
					<span
						onClick={() => setIsExpanded(!isExpanded)}
						style={item.isNegated ? { textDecoration: 'line-through' } : undefined}
						className={
							item.isSelected ? 'hawk-facet-rail__facet-name checked' : 'hawk-facet-rail__facet-name'
						}
					>
						{item.hierarchyValue.Label} {facet.ShowItemsCount ? `(${item.hierarchyValue.Count})` : ''}
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
						{isExpanded ? (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M4.86517 8.4259C5.19061 8.10046 5.71825 8.10046 6.04368 8.4259L9.99988 12.3821L13.9561 8.4259C14.2815 8.10047 14.8092 8.10047 15.1346 8.4259C15.46 8.75134 15.46 9.27898 15.1346 9.60441L10.5891 14.1499C10.2637 14.4753 9.73606 14.4753 9.41063 14.1499L4.86517 9.60441C4.53973 9.27898 4.53973 8.75134 4.86517 8.4259Z"
									fill="black"
								/>
							</svg>
						) : (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M15.1299 13.7759C14.8018 14.0986 14.2742 14.0943 13.9515 13.7662L10.0001 9.74896L6.04877 13.7662C5.72603 14.0943 5.19841 14.0986 4.8703 13.7759C4.54218 13.4532 4.53782 12.9256 4.86056 12.5974L9.40601 7.97622C9.56267 7.81696 9.77672 7.72726 10.0001 7.72726C10.2235 7.72726 10.4376 7.81696 10.5942 7.97623L15.1397 12.5974C15.4624 12.9256 15.4581 13.4532 15.1299 13.7759Z"
									fill="black"
								/>
							</svg>
						)}
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
