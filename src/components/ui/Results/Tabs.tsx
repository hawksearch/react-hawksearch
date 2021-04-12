import React, { useEffect } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useHawksearch } from 'components/StoreProvider';
import { useHawkConfig } from '../../ConfigProvider';

function Tabs() {
    const {
        actor: hawkActor,
        store: { searchResults },
    } = useHawksearch();
    const { config } = useHawkConfig();

    const tabFacet = searchResults && searchResults.Facets.find(facet => facet.FieldType === 'tab');

    useEffect(() => {
        if (tabFacet && tabFacet.Values.filter(t => t.Selected).length == 0 && config.tabConfig && config.tabConfig.alwaysOn) {
            hawkActor.setFacetValues(tabFacet, [tabFacet.Values[0]]);
        }
    })

    function getTabCssClassName(tabValues, index: number): string {
        const bootstrapClasses = 'ml-2 mr-2 mt-2 mb-2';

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
                            <NavItem className={getTabCssClassName(tabValues, index)} key={`results_type_tab_${index}`}>
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
    } else {
        return null;
    }
}

export default Tabs;
