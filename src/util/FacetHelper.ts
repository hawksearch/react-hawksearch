import { Value } from "models/Facets";
import { HierarchicalValue } from "models/Facets/HierarchicalValue";

export function prepareHierarchicalFacetValues(facetValues: Value[]): null {
    debugger;
    const selectedValuesWithoutLevel = facetValues.map(v => v.Value && v.Value.substring(v.Value.indexOf("|") + 1));

    const selectedValue = !selectedValuesWithoutLevel && Object.keys(selectedValuesWithoutLevel).length > 0 ? selectedValuesWithoutLevel[0] : "";
    const selectedValuePath = selectedValue.split("/");

    facetValues.forEach(value => {
        if (!value.Value) {
            return;
        }

        let valueWithoutLevel = value.Value;
        valueWithoutLevel = valueWithoutLevel.substring(valueWithoutLevel.indexOf("|") + 1);
        const valuesArray = valueWithoutLevel.split("/");

        // handle expand 

        // end of handling expand
        let hierarchicalValueList: HierarchicalValue[];
        let childValuePath = "";
        valuesArray.forEach((childValue, level) => {
            //hierarchicalValueList.push(childValue);
            childValuePath = (childValuePath === "" ? childValue : (childValuePath + "/" + childValue));
            let hierarchicalValues = hierarchicalValueList.filter(v => v.ValuePath === (level + "|" + childValuePath));
            if (hierarchicalValues && Object.keys(hierarchicalValues).length > 0) {
                hierarchicalValueList = hierarchicalValues[0].Children;
                return;
            }

            let hierarchicalValue: HierarchicalValue = {
                Selected: false,
                Value: value.Value,
                ValuePath: value.Value || "",
                Label: value.Label,
                Count: value.Count,
                Level: level,
                Children: []
            };
            hierarchicalValueList.push(hierarchicalValue);
        });
    });
    return null;
}