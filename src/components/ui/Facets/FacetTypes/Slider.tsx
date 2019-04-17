import React, { useState } from 'react';
import Rheostat, { PublicState } from 'rheostat';
import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';
import SliderNumericInputs from 'components/ui/Facets/SliderNumericInputs';

function Slider() {
	const {} = useHawkSearch();

	const {
		state: { facetValues },
		facet,
		actor,
	} = useFacet();

	// the range of the slider is defined by the first facet value. or null if there is no first value
	const range = facetValues.length > 0 ? facetValues[0] : null;

	const rangeMin = range && parseInt(range.RangeMin || '', 10);
	const rangeMax = range && parseInt(range.RangeMax || '', 10);
	const rangeStart = range && parseInt(range.RangeStart || '', 10);
	const rangeEnd = range && parseInt(range.RangeEnd || '', 10);

	// if there's no range, initialize to zeros
	const [minValue, setMinValue] = useState(rangeStart || rangeMin || 0);
	const [maxValue, setMaxValue] = useState(rangeEnd || rangeMax || 0);

	if (
		rangeMin === null ||
		isNaN(rangeMin) ||
		rangeMax === null ||
		isNaN(rangeMax) ||
		rangeStart === null ||
		isNaN(rangeStart) ||
		rangeEnd === null ||
		isNaN(rangeEnd)
	) {
		// this facet is somehow misconfigured so don't render
		return null;
	}

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
				<SliderNumericInputs
					min={rangeMin}
					max={rangeMax}
					values={[minValue, maxValue]}
					onValueChange={onValueChange}
				/>
				<Rheostat min={rangeMin} max={rangeMax} values={[minValue, maxValue]} onChange={onSliderValueChange} />
			</div>
		</div>
	);
}

export default Slider;
