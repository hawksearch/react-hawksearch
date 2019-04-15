import React, { useState } from 'react';
export interface SliderNumericInputsProps {
	min: number;
	max: number;
	values: number[];
	onValueChange(isMax: boolean, value: string): void;
}
function SliderNumericInputs(
	sliderProps: SliderNumericInputsProps) {

	function onMinChange(event: React.FormEvent<HTMLInputElement>) {
		sliderProps.onValueChange(false, event.currentTarget.value);
	}

	function onMaxChange(event: React.FormEvent<HTMLInputElement>) {
		sliderProps.onValueChange(true, event.currentTarget.value);
	}

	return (
		<div className="hawk-sliderNumeric">
			<input type="text"
				className="hawk-numericInput numeric-from"
				min={sliderProps.min}
				max={sliderProps.max}
				value={sliderProps.values[0]}
				data-type="currency"
				onChange={onMinChange}
			/>
			<input type="text"
				className="hawk-numericInput numeric-to"
				min={sliderProps.min}
				max={sliderProps.max}
				value={sliderProps.values[1]}
				onChange={onMaxChange}
				data-type="currency" />

		</div>
	);
}

export default SliderNumericInputs;
