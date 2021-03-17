import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useHawksearch } from 'components/StoreProvider';

function Tabs() {
	const {
		actor: hawkActor,
		store: { searchResults },
	} = useHawksearch();

	const tabFacet = searchResults && searchResults.Facets.find(facet => facet.FieldType === 'tab');

	function getTabCssClassName(tabValues, index: number): string {
		const tabSelectedValue = tabValues.filter(t => t.Selected);
		const bootstrapClasses = 'ml-2 mr-2 mt-2 mb-2';
		// // Make default selection
		if (tabSelectedValue.length === 0 && index === 0) {
			return `${bootstrapClasses} active`;
		}
		if (tabValues[index].Selected) {
			return `${bootstrapClasses} active`;
		}
		return `${bootstrapClasses}`;
	}

	if (tabFacet && tabFacet.Values.length > 0) {
		return (
			<div className="hawk-preview__results_tabs">
				<Nav tabs>
					{tabFacet.Values.map((tabValue, index, tabValues) => {
						return (
							<NavItem
								className={getTabCssClassName(tabValues, index)}
								key={`results_type_tab_${index}`}
							>
								<NavLink
									onClick={() => {
										hawkActor.setFacetValues(tabFacet, [tabValue]);
									}}
								>
									{tabValue.Label}
								</NavLink>
							</NavItem>
						);
					})}
				</Nav>
			</div>
		);
	}
	else {
		return null;
	}
}

export default Tabs;
