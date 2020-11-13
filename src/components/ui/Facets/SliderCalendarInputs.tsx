import React, { useState, useEffect } from 'react';

function formatDate(unixFormat: number) {
	const date = new Date(unixFormat);
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 101).toString().substring(1);
	const day = (date.getDate() + 100).toString().substring(1);
	return year + '-' + month + '-' + day;
}
export interface SliderCalendarInputsProps {
	min: number;
	max: number;
	values: number[];
	onValueChange(minValue: number, maxValue: number): void;
}
function SliderCalendarInputs(sliderProps: SliderCalendarInputsProps) {
	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(0);

	function onMinUpdate(event: any) {
		const value = new Date(event.target.value).getTime();

		const newMinValue = Number(value);
		if (isNaN(newMinValue) || minValue === value) {
			return;
		}

		setMinValue(value);
		sliderProps.onValueChange(Number(newMinValue), Number(maxValue));
	}

	function onMaxUpdate(event: any) {
		const value = new Date(event.target.value).getTime();

		const newMaxValue = Number(value);
		if (isNaN(newMaxValue) || maxValue === value) {
			return;
		}
		setMaxValue(value);
		sliderProps.onValueChange(Number(minValue), Number(newMaxValue));
	}

	useEffect(() => {
		setMinValue(sliderProps.values[0]);
		setMaxValue(sliderProps.values[1]);
	}, [sliderProps]);
	return (
		<div className="hawk-sliderNumeric">
			<input
				type="date"
				value={formatDate(Number(minValue))}
				className="hawk-text-input hawk-date-value-start"
				min={formatDate(sliderProps.min)}
				max={formatDate(sliderProps.max)}
				onChange={onMinUpdate}
			/>

			<input
				type="date"
				value={formatDate(Number(maxValue))}
				className="hawk-text-input hawk-date-value-end"
				min={formatDate(sliderProps.min)}
				max={formatDate(sliderProps.max)}
				onChange={onMaxUpdate}
			/>
		</div>
	);
}

export default SliderCalendarInputs;
