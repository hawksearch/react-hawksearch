import React, { useEffect, useState } from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { FacetSelectionState } from 'store/Store';
import { useFacet } from 'components/ui/Facets/Facet';
import CheckmarkSVG from 'components/svg/CheckmarkSVG';
import { Value } from 'models/Facets';
import PlusCircleSVG from 'components/svg/PlusCircleSVG';
import DashCircleSVG from 'components/svg/DashCircleSVG';
import { ClientSelectionValue } from 'store/ClientSelections';

export interface NestedItemProps {
	hierarchyValue: Value;
	isNegated: boolean;
	isSelected: boolean;
	onValueSelected(facetValue: Value, isNegated: boolean): void;
}

function checkChildSelections(facetArray, matchValue) {
	const matchedValue = facetArray.find((i: ClientSelectionValue) => {
		return (i.path || '').split('/').indexOf(matchValue) !== -1;
	});
	return !matchedValue ? false : true;
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

	function isIE() {
		const ua = window.navigator.userAgent;
		const oldIE = ua.indexOf('MSIE ');
		const newIe = ua.indexOf('Trident/');

		return oldIE > -1 || newIe > -1;
	}

	function getCollapseStateClass(expanded) {
		const classes = ['hawk-collapseState'];

		if (!expanded) {
			classes.push('collapsed');
		}

		if (isIE()) {
			classes.push('ie-fix');
		}

		return classes.join(' ');
	}

	useEffect(() => {
		const isPartialSelection = checkChildSelections(
			(store.facetSelections[facet.Field] || {}).items || [],
			item.hierarchyValue.Value
		);
		if (isPartialSelection) {
			setIsExpanded(true);
		}
	}, [item]);

	function setSelection() {
		item.onValueSelected(hierarchyValue, false);
		if (!isExpanded) {
			setIsExpanded(true);
		}
	}

	return (
		<li className="hawk-facet-rail__facet-list-item hawkFacet-group">
			<div className="hawkFacet-group__inline">
				<button
					onClick={() => setSelection()}
					className="hawk-facet-rail__facet-btn"
					aria-pressed={item.isSelected}
				>
					{!item.isNegated && <input type="checkbox" checked={item.isSelected} onChange={() => {}} />}

					<span
						style={item.isNegated ? { textDecoration: 'line-through' } : undefined}
						className="hawk-facet-rail__facet-name"
					>
						{item.hierarchyValue.Label} ({item.hierarchyValue.Count})
					</span>
					<button
						onClick={e => {
							e.stopPropagation();
							item.onValueSelected(hierarchyValue, true);
						}}
						className="hawk-facet-rail__facet-btn-exclude"
						aria-describedby="visually-hidden"
					>
						{item.isNegated ? (
							<>
								<PlusCircleSVG class="hawk-facet-rail__facet-btn-include" />
								<span id="visually-hidden" className="visually-hidden">
									Include facet
								</span>
							</>
						) : (
							<>
								<DashCircleSVG />
								<span id="visually-hidden" className="visually-hidden">
									Exclude facet
								</span>
							</>
						)}
					</button>
				</button>

				{hierarchyChildren.length > 0 ? (
					<button
						className={getCollapseStateClass(isExpanded)}
						aria-expanded="false"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.86517 8.4259C5.19061 8.10046 5.71825 8.10046 6.04368 8.4259L9.99988 12.3821L13.9561 8.4259C14.2815 8.10047 14.8092 8.10047 15.1346 8.4259C15.46 8.75134 15.46 9.27898 15.1346 9.60441L10.5891 14.1499C10.2637 14.4753 9.73606 14.4753 9.41063 14.1499L4.86517 9.60441C4.53973 9.27898 4.53973 8.75134 4.86517 8.4259Z"
								fill="black"
							/>
						</svg>
					</button>
				) : null}
			</div>
			{isExpanded && hierarchyChildren ? (
				<div className="hawk-facet-rail__w-100">
					<ul className="hawkFacet-group-inside">
						{hierarchyChildren.map(value => {
							const selectionState = store.isFacetSelected(facet, value, store.negativeFacetValuePrefix)
								.state;
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
