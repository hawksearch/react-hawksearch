import React, { useState, useEffect } from 'react';
export interface SliderNumericInputsProps {
	min: number;
	max: number;
	values: number[];
	onValueChange(minValue: number, maxValue: number): void;
}
function SliderNumericInputs(sliderProps: SliderNumericInputsProps) {
	const [minValue, setMinValue] = useState('' as string);
	const [maxValue, setMaxValue] = useState('' as string);

	function onMinUpdate(event: React.FormEvent<HTMLInputElement>) {
		const newMinValue = Number(event.currentTarget.value);
		if (isNaN(newMinValue) && event.currentTarget.value !== '-') {
			return;
		}
		setMinValue(event.currentTarget.value);
	}

	function onMaxUpdate(event: React.FormEvent<HTMLInputElement>) {
		const newMaxValue = Number(event.currentTarget.value);
		if (isNaN(newMaxValue) && event.currentTarget.value !== '-') {
			return;
		}
		setMaxValue(event.currentTarget.value);
	}

	function onValueChanged(event: React.FormEvent<HTMLInputElement>) {
		sliderProps.onValueChange(Number(minValue), Number(maxValue));
	}

	useEffect(() => {
		setMinValue(sliderProps.values[0].toString());
		setMaxValue(sliderProps.values[1].toString());
	}, [sliderProps]);

	return (
		<div className="hawk-sliderNumeric">
			<input
				type="text"
				className="hawk-numericInput numeric-from"
				min={sliderProps.min}
				max={sliderProps.max}
				value={minValue}
				data-type="currency"
				onChange={onMinUpdate}
				onBlur={onValueChanged}
			/>
			<input
				type="text"
				className="hawk-numericInput numeric-to"
				min={sliderProps.min}
				max={sliderProps.max}
				value={maxValue}
				onChange={onMaxUpdate}
				onBlur={onValueChanged}
				data-type="currency"
			/>
		</div>
	);
}

export default SliderNumericInputs;
