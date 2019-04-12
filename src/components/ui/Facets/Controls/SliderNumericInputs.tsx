import React, { useState } from 'react';
export interface SliderNumericInputsProps {
	min: number;
	max:number;
	values: number[];
	onMinChange(event: React.FormEvent<HTMLInputElement>): void;
	onMaxChange(event: React.FormEvent<HTMLInputElement>): void;
}
function SliderNumericInputs(
	sliderProps: SliderNumericInputsProps){
	
	return (		
		<div className="hawk-sliderNumeric">
						<input type="text" 
							className="hawk-numericInput numeric-from" 
							min={sliderProps.min} 
							max={sliderProps.max}
							value={sliderProps.values[0]} 							
							data-type="currency"
							onChange={sliderProps.onMinChange}				
							/>
						<input type="text" 
							className="hawk-numericInput numeric-to" 
							min={sliderProps.min} 
							max={sliderProps.max}
							value={sliderProps.values[1]} 	
							onChange={sliderProps.onMaxChange}
							data-type="currency" />
						
				</div>
	);
}

export default SliderNumericInputs;
