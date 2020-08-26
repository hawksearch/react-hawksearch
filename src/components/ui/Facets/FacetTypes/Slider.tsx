import React, { useState, useEffect } from 'react';
import { PublicState } from 'rheostat';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import SliderNumericInputs from 'components/ui/Facets/SliderNumericInputs';
import SliderCalendarInputs from '../SliderCalendarInputs';
const Rheostat = React.lazy(() => import(/* webpackChunkName: "rheostat" */ 'rheostat'));

function formatDate(date: Date) {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 101).toString().substring(1);
	const day = (date.getDate() + 100).toString().substring(1);
	return year + '-' + month + '-' + day;
}

function replaceHyphen(date: string) {
	if (!date) {
		return date;
	}
	return date.replace(/-/g, '/');
}

function Slider() {
	const { facet } = useFacet();
	if (facet.DataType && facet.DataType === 'datetime') {
		return <SliderDate />;
	}
	return <SliderNumeric />;
}

function SliderDate() {
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

	const [rangeMin, setMinRange] = useState(range && Number(new Date(range.RangeMin || '').getTime()));
	const [rangeMax, setMaxRange] = useState(range && Number(new Date(range.RangeMax || '').getTime()));
	const [rangeStart, setStartRange] = useState(range && Number(new Date(range.RangeStart || '').getTime()));
	const [rangeEnd, setEndRange] = useState(range && Number(new Date(range.RangeEnd || '').getTime()));

	// if there's no range, initialize to zeros
	const [minValue, setMinValue] = useState<number>();
	const [maxValue, setMaxValue] = useState<number>();

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
			setMinValue(Number(new Date(selectedValues[0]).getTime()));
			setMaxValue(Number(new Date(selectedValues[1]).getTime()));
		}
	}, [facetSelections]);

	useEffect(() => {
		const newRange = facetValues.length > 0 ? facetValues[0] : null;
		setMinRange(newRange && Number(new Date(newRange.RangeMin || '').getTime()));
		setMaxRange(newRange && Number(new Date(newRange.RangeMax || '').getTime()));
		setStartRange(newRange && Number(new Date(newRange.RangeStart || '').getTime()));
		setEndRange(newRange && Number(new Date(newRange.RangeEnd || '').getTime()));
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

		const formattedMinVal = replaceHyphen(formatDate(new Date(minVal)));
		const formattedMaxVal = replaceHyphen(formatDate(new Date(maxVal)));

		// this selection is sent to hawk separated by commas, so build the value here
		const selection = `${formattedMinVal},${formattedMaxVal}`;
		actor.setFacets([selection]);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<React.Suspense fallback={<div>Loading...</div>}>
					<SliderCalendarInputs
						min={rangeMin}
						max={rangeMax}
						values={[
							minValue === undefined ? rangeStart : Math.max(minValue, rangeMin),
							maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax),
						]}
						onValueChange={onValueChange}
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

function SliderNumeric() {
	const {
		store: { facetSelections },
	} = useHawkSearch();

	const {
		state: { facetValues, decimalPrecision },
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
			currentMinValue = newMinValue;
		}

		if (currentMaxValue !== newMaxValue && newMaxValue >= currentMinValue) {
			currentMaxValue = newMaxValue;
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
							minValue === undefined ? Math.floor(rangeStart) : Math.max(minValue, rangeMin),
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

export default Slider;
