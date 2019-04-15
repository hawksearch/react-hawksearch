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

	// the range of the slider is defined by the first facet value. or null if there is no first value
	const range = facetValues.length > 0 ? facetValues[0] : null;

	const rangeMin = range && parseInt(range.RangeMin || '', 10);
	const rangeMax = range && parseInt(range.RangeMax || '', 10);

	// if there's no range, initialize to zeros
	const [minValue, setMinValue] = useState(rangeMin || 0);
	const [maxValue, setMaxValue] = useState(rangeMax || 0);

	if (rangeMin === null || isNaN(rangeMin) || rangeMax === null || isNaN(rangeMax)) {
		// this facet is somehow misconfigured so don't render
		return null;
	}

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
