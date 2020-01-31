import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';

export interface SliderNumericInputsProps {
	min: number;
	max: number;
	values: number[];
	isCurrency: boolean;
	currencySymbol: string;
	decimalPrecision: number;
	onValueChange(minValue: number, maxValue: number): void;
}
function SliderNumericInputs(sliderProps: SliderNumericInputsProps) {
	const [minValue, setMinValue] = useState('' as string);
	const [maxValue, setMaxValue] = useState('' as string);

	function onMinUpdate(values: any) {
		const { formattedValue, value } = values;

		const newMinValue = Number(value);
		if (isNaN(newMinValue) || minValue === value) {
			return;
		}

		setMinValue(value);
	}

	function onMaxUpdate(values: any) {
		const { formattedValue, value } = values;

		const newMaxValue = Number(value);
		if (isNaN(newMaxValue) || maxValue === value) {
			return;
		}
		setMaxValue(value);
	}
	function reloadFacets(event: React.FormEvent<HTMLInputElement>) {
		sliderProps.onValueChange(Number(minValue), Number(maxValue));
	}

	useEffect(() => {
		setMinValue(sliderProps.values[0].toString());
		setMaxValue(sliderProps.values[1].toString());
	}, [sliderProps]);

	return (
		<div className="hawk-sliderNumeric">
			<NumberFormat
				thousandSeparator={sliderProps.isCurrency}
				prefix={sliderProps.isCurrency ? sliderProps.currencySymbol : ''}
				value={minValue}
				className="hawk-numericInput numeric-from"
				min={sliderProps.min}
				max={sliderProps.max}
				onValueChange={onMinUpdate}
				onBlur={reloadFacets}
				decimalScale={sliderProps.decimalPrecision}
			/>

			<NumberFormat
				thousandSeparator={sliderProps.isCurrency}
				prefix={sliderProps.isCurrency ? sliderProps.currencySymbol : ''}
				value={maxValue}
				className="hawk-numericInput numeric-to"
				min={sliderProps.min}
				max={sliderProps.max}
				onValueChange={onMaxUpdate}
				onBlur={reloadFacets}
				decimalScale={sliderProps.decimalPrecision}
			/>
		</div>
	);
}

export default SliderNumericInputs;
