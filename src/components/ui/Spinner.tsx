import React from 'react';

export interface SpinnerProps {
	isVisible: boolean;
}

function Spinner({ isVisible }: SpinnerProps) {
	if (!isVisible) {
		return null;
	}

	return (
		<div className={'hawk-modal'}>
			<div className={'hawk-modal__content'}>Loading...</div>
		</div>
	);
}

export default Spinner;
