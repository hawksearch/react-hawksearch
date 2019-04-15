import React, { useState } from 'react';
import Rheostat, { PublicState } from 'rheostat';

import { useHawkSearch } from '../../../StoreProvider';
import { useFacet } from '..';
import SliderNumericInputs from '../SliderNumericInputs';

function Slider() {
	const { } = useHawkSearch();

	const {
		state: { facetValues },
		facet,
		actor,
	} = useFacet();

	if (facetValues.length === 0) {
		// if the range facet doesn't have any values, we can't get a min or max
		return null;
	}
	const range = facetValues[0];

	const rangeMin = parseInt(range.RangeMin || '', 10);
	const rangeMax = parseInt(range.RangeMax || '', 10);

	const rangeStart = parseInt(range.RangeStart || '', 10);
	const rangeEnd = parseInt(range.RangeEnd || '', 10);

	if (isNaN(rangeMin) || isNaN(rangeMax) || isNaN(rangeStart) || isNaN(rangeEnd)) {
		// this facet is somehow misconfigured so don't render
		return null;
	}

	const [minValue, setMinValue] = useState(rangeStart);
	const [maxValue, setMaxValue] = useState(rangeEnd);

	function onSliderValueChange(state: PublicState) {
		const [newMin, newMax] = state.values;

		setFacetValues(newMin, newMax);
	}

	function onValueChange(isMax: boolean, value: string) {
		isMax ? setFacetValues(minValue, parseFloat(value)) : setFacetValues(parseFloat(value), maxValue);
	}

	function setFacetValues(minVal: number, maxVal: number) {
		setMinValue(minVal);
		setMaxValue(maxVal);

		// this selection is sent to hawk separated by commas, so build the value here
		const selection = `${minVal},${maxVal}`;

		actor.setFacets([selection]);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">

				<SliderNumericInputs min={rangeMin} max={rangeMax} values={[minValue, maxValue]} onValueChange={onValueChange} />
				<Rheostat min={rangeMin} max={rangeMax} values={[minValue, maxValue]} onChange={onSliderValueChange} />
			</div>
		</div>
	);
}

export default Slider;
