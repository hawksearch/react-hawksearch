import React from 'react';

interface SizeItemProps {
	value: string;
	label: string;
	isSelected: boolean;
	isNegated: boolean;
	onSwatchSelected: (a: string, b: boolean) => void;
}

const SizeItem = React.memo(({ value, label, onSwatchSelected, isSelected, isNegated }: SizeItemProps) => {
	return (
		<li key={value} className={isSelected ? 'selected' : ''} onClick={() => onSwatchSelected(value, isNegated)}>
			<div>{label}</div>
		</li>
	);
});

export default SizeItem;
