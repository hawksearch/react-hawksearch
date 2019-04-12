import React, { useState } from 'react';
import Rheostat, { PublicState } from 'rheostat';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';
import SliderNumericInputs from '../Controls/SliderNumericInputs';

function Slider() {
	const {} = useHawkSearch();

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

	function onMinChange(event: React.FormEvent<HTMLInputElement>) {
		onNumericInputChange(false,event.currentTarget.value);
	}

	function onMaxChange(event: React.FormEvent<HTMLInputElement>) {		
		onNumericInputChange(true,event.currentTarget.value);
	}

	function onNumericInputChange(isMax: boolean, value: string){		
		isMax ? setMaxValue(parseFloat(value)) : setMinValue(parseFloat(value))

		// this selection is sent to hawk separated by commas, so build the value here
		const selection = `${minValue},${maxValue}`;

		actor.setFacets([selection]);
	}

	return (		
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">

				<SliderNumericInputs min={rangeMin} max={rangeMax} values={[minValue, maxValue]} onMinChange={onMinChange} onMaxChange={onMaxChange} />				
				<Rheostat min={rangeMin} max={rangeMax} values={[minValue, maxValue]} onChange={onChange} />
				

			</div>
		</div>
	);
}

export default Slider;
