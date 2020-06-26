import React, { useState } from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { FacetSelectionState } from 'store/Store';
import { useFacet } from 'components/ui/Facets/Facet';
import CheckmarkSVG from 'components/svg/CheckmarkSVG';
import { Value } from 'models/Facets';
import PlusCircleSVG from 'components/svg/PlusCircleSVG';
import DashCircleSVG from 'components/svg/DashCircleSVG';

export interface NestedItemProps {
	hierarchyValue: Value;
	isNegated: boolean;
	isSelected: boolean;
	onValueSelected(facetValue: Value, isNegated: boolean): void;
}

function NestedItem(item: NestedItemProps) {
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
						className={
							item.isSelected
								? 'hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox--checked'
								: 'hawk-facet-rail__facet-checkbox'
						}
					>
						{item.isSelected ? <CheckmarkSVG class="hawk-facet-rail__facet-checkbox-icon" /> : null}
					</span>

					<span
						style={item.isNegated ? { textDecoration: 'line-through' } : undefined}
						className="hawk-facet-rail__facet-name"
					>
						{item.hierarchyValue.Label} ({item.hierarchyValue.Count})
					</span>
				</button>

				<button
					onClick={e => item.onValueSelected(hierarchyValue, true)}
					className="hawk-facet-rail__facet-btn-exclude"
				>
					{item.isNegated ? (
						<>
							<PlusCircleSVG class="hawk-facet-rail__facet-btn-include" />
							<span className="visually-hidden">Include facet</span>
						</>
					) : (
						<>
							<DashCircleSVG />
							<span className="visually-hidden">Exclude facet</span>
						</>
					)}
				</button>
				{hierarchyChildren.length > 0 ? (
					<button
						className={isExpanded ? 'hawk-collapseState' : 'hawk-collapseState collapsed'}
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
								<NestedItem
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

export default NestedItem;
