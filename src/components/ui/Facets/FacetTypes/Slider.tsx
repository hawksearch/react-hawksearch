import React, { useState, useEffect } from 'react';
import { PublicState } from 'rheostat';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import SliderNumericInputs from 'components/ui/Facets/SliderNumericInputs';
import { Value } from 'models/Facets';

const Rheostat = React.lazy(() => import(/* webpackChunkName: "rheostat" */ 'rheostat'));

function Slider() {
	const {
		store: { facetSelections },
	} = useHawkSearch();

	const {
		state: { facetValues },
		facet,
		actor,
	} = useFacet();

	// the range of the slider is defined by the first facet value. or null if there is no first value
	const range = facetValues.length > 0 ? facetValues[0] : null;

	const [rangeMin, setMinRange] = useState(range && Math.floor(parseFloat(range.RangeMin || '')));
	const [rangeMax, setMaxRange] = useState(range && Math.ceil(parseFloat(range.RangeMax || '')));
	const [rangeStart, setStartRange] = useState(range && Math.round(parseFloat(range.RangeStart || '')));
	const [rangeEnd, setEndRange] = useState(range && Math.round(parseFloat(range.RangeEnd || '')));

	// if there's no range, initialize to zeros
	const [minValue, setMinValue] = useState<number>();
	const [maxValue, setMaxValue] = useState<number>();
	const [selectedMinValue, selectMinValue] = useState<number>();
	const [selectedMaxValue, selectMaxValue] = useState<number>();

	useEffect(() => {
		// clear min and max value if these were cleared
		if (facet.ParamName && !(facet.ParamName in facetSelections)) {
			setMinValue(undefined);
			setMaxValue(undefined);
		}
	}, [facetSelections]);

	useEffect(() => {
		const newRange = facetValues.length > 0 ? facetValues[0] : null;
		setMinRange(newRange && Math.floor(parseFloat(newRange.RangeMin || '')));
		setMaxRange(newRange && Math.ceil(parseFloat(newRange.RangeMax || '')));
		setStartRange(newRange && Math.round(parseFloat(newRange.RangeStart || '')));
		setEndRange(newRange && Math.round(parseFloat(newRange.RangeEnd || '')));
	}, [facetValues]);

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

	function setFacetValues(minVal: number | undefined, maxVal: number | undefined) {
		if (!minVal || !maxVal) {
			return;
		}
		setMinValue(minVal);
		setMaxValue(maxVal);

		// this selection is sent to hawk separated by commas, so build the value here
		const selection = `${minVal},${maxVal}`;

		actor.setFacets([selection]);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<React.Suspense fallback={<div>Loading...</div>}>
					<SliderNumericInputs
						min={rangeMin}
						max={rangeMax}
						values={[
							!minValue ? rangeStart : Math.max(minValue, rangeMin),
							!maxValue ? rangeEnd : Math.min(maxValue, rangeMax),
						]}
						onValueChange={onValueChange}
					/>
					<Rheostat
						min={rangeMin}
						max={rangeMax}
						values={[
							!minValue ? rangeStart : Math.max(minValue, rangeMin),
							!maxValue ? rangeEnd : Math.min(maxValue, rangeMax),
						]}
						onChange={onSliderValueChange}
					/>
				</React.Suspense>
			</div>
		</div>
	);
}

export default Slider;
