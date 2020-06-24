import React, { useState, useEffect } from 'react';
import { PublicState } from 'rheostat';

import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import SliderNumericInputs from 'components/ui/Facets/SliderNumericInputs';
const Rheostat = React.lazy(() => import(/* webpackChunkName: "rheostat" */ 'rheostat'));

function SliderNumeric() {
	const {
		store: { facetSelections },
	} = useHawksearch();

	const {
		state: { facetValues, decimalPrecision },
		facet,
		actor,
	} = useFacet();
	// the range of the slider is defined by the first facet value. or null if there is no first value
	const range = facetValues.length > 0 ? facetValues[0] : null;

	const [rangeMin, setMinRange] = useState(range && Number(parseFloat(range.RangeMin || '').toFixed(2)));
	const [rangeMax, setMaxRange] = useState(range && Number(parseFloat(range.RangeMax || '').toFixed(2)));
	const [rangeStart, setStartRange] = useState(range && Number(parseFloat(range.RangeStart || '').toFixed(2)));
	const [rangeEnd, setEndRange] = useState(range && Number(parseFloat(range.RangeEnd || '').toFixed(2)));

	// if there's no range, initialize to zeros
	const [minValue, setMinValue] = useState<number>();
	const [maxValue, setMaxValue] = useState<number>();

	const [isCurency, setIsCurrency] = useState(facet.IsCurrency);
	const [currencySymbol, setCurrencySymbol] = useState(facet.CurrencySymbol);

	useEffect(() => {
		setCurrencySymbol(facet.CurrencySymbol || '$');
		setIsCurrency(facet.IsCurrency);
	}, [facet]);

	useEffect(() => {
		const paramName = facet.ParamName || facet.Field;

		// clear min and max value if these were cleared
		if (!paramName || !(paramName in facetSelections)) {
			setMinValue(undefined);
			setMaxValue(undefined);
		} else if (
			paramName in facetSelections &&
			facetSelections[paramName].items &&
			facetSelections[paramName].items.length > 0
		) {
			const selectedValues = facetSelections[paramName].items[0].value.split(',');
			setMinValue(Number(selectedValues[0]));
			setMaxValue(Number(selectedValues[1]));
		}
	}, [facetSelections]);

	useEffect(() => {
		const newRange = facetValues.length > 0 ? facetValues[0] : null;
		setMinRange(newRange && Number(parseFloat(newRange.RangeMin || '').toFixed(2)));
		setMaxRange(newRange && Number(parseFloat(newRange.RangeMax || '').toFixed(2)));
		setStartRange(newRange && Number(parseFloat(newRange.RangeStart || '').toFixed(2)));
		setEndRange(newRange && Number(parseFloat(newRange.RangeEnd || '').toFixed(2)));
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

	function onValueChange(newMinValue: number, newMaxValue: number) {
		let currentMinValue = minValue;
		let currentMaxValue = maxValue;
		// if min value wasn't yet selected use range start
		if (minValue === undefined && rangeStart !== null) {
			currentMinValue = rangeStart; // setMinValue(rangeStart);
		}

		// if max value wasn't yet selected use range end
		if (maxValue === undefined && rangeEnd !== null) {
			currentMaxValue = rangeEnd;
		}

		if (currentMinValue === undefined || currentMaxValue === undefined) {
			return;
		}

		if (currentMinValue !== newMinValue && newMinValue <= currentMaxValue) {
			if (rangeMin !== null && newMinValue <= rangeMin) {
				currentMinValue = rangeMin;
			} else {
				currentMinValue = newMinValue;
			}
		}

		if (currentMaxValue !== newMaxValue && newMaxValue >= currentMinValue) {
			if (rangeMax !== null && newMaxValue >= rangeMax) {
				currentMaxValue = rangeMax;
			} else {
				currentMaxValue = newMaxValue;
			}
		}
		setMinValue(currentMinValue);
		setMaxValue(currentMaxValue);
		setFacetValues(currentMinValue, currentMaxValue);
	}

	function setFacetValues(minVal: number | undefined, maxVal: number | undefined) {
		if (minVal === undefined || maxVal === undefined || isNaN(minVal) || isNaN(maxVal)) {
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
						currencySymbol={currencySymbol}
						isCurrency={isCurency}
						values={[
							minValue === undefined ? rangeStart : Math.max(minValue, rangeMin),
							maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax),
						]}
						onValueChange={onValueChange}
						decimalPrecision={decimalPrecision}
					/>
					<Rheostat
						min={rangeMin}
						max={rangeMax}
						values={[
							Math.floor(minValue === undefined ? rangeStart : Math.max(minValue, rangeMin)),
							Math.ceil(maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax)),
						]}
						onChange={onSliderValueChange}
					/>
				</React.Suspense>
			</div>
		</div>
	);
}

export default SliderNumeric;
