import React, { useState } from 'react';

export interface PlaceholderImageProps {
	/** Whether or not to display a spinner in the center of the placeholder. */
	showSpinner: boolean;
}

function PlaceholderImage({ showSpinner }: PlaceholderImageProps) {
	const [height] = useState(Math.round(Math.random() * (175 - 125) + 125));

	return (
		<div className="hawk-results__item-placeholder" style={{ height: `${height}px` }}>
			{showSpinner && <div className="hawk-placeholder__image">Loading...</div>}
		</div>
	);
}

export default PlaceholderImage;
