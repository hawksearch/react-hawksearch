import React, { useState } from 'react';
import Rheostat, { PublicState } from 'rheostat';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';

function Link() {
	const {} = useHawkSearch();
	const {
		state: { facetValues },
		actor,
	} = useFacet();

	if (facetValues.length === 0) {
		// if the range facet doesn't have any values, we can't get a min or max
		return null;
	}

	const range = facetValues[0];

	const rangeMin = parseInt(range.RangeMin || '', 10);
	const rangeMax = parseInt(range.RangeMax || '', 10);

	if (isNaN(rangeMin) || isNaN(rangeMax)) {
		// this facet is somehow misconfigured so don't render
		return null;
	}

	const [minValue, setMinValue] = useState(rangeMin);
	const [maxValue, setMaxValue] = useState(rangeMax);

	function onChange(state: PublicState) {
		const [newMin, newMax] = state.values;

		setMinValue(newMin);
		setMaxValue(newMax);

		// this selection is sent to hawk separated by commas, so build the value here
		const selection = `${newMin},${newMax}`;

		actor.setFacets([selection]);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<Rheostat min={rangeMin} max={rangeMax} values={[minValue, maxValue]} onChange={onChange} />
			</div>
		</div>
	);
}

export default Link;
