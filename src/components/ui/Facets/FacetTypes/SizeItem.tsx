import React from 'react';

interface SizeItemProps {
	size: {
		Value: string;
		Label: string;
		Selected: boolean;
	};
	isNegated: boolean;
	onSwatchSelected: (a: string, b: boolean) => void;
}

const SizeItem = React.memo(({ size, onSwatchSelected, isNegated }: SizeItemProps) => {
	return (
		<li key={size.Value} className={size.Selected ? 'selected' : ''}>
			<button onClick={() => onSwatchSelected(size.Value, isNegated)} aria-pressed={size.Selected}>
				<div>{size.Label}</div>
			</button>
		</li>
	);
});

export default SizeItem;
