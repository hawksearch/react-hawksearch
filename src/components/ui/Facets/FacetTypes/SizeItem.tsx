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
		<li
			key={size.Value}
			className={size.Selected ? 'selected' : ''}
			onClick={() => onSwatchSelected(size.Value, isNegated)}
		>
			<div>{size.Label}</div>
		</li>
	);
});

export default SizeItem;
