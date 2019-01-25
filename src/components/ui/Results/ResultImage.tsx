import React, { useState } from 'react';

import { Result } from 'models/Search';
import PlaceholderImage from './PlaceholderImage';

export interface ResultImageProps {
	item: Result;
}

function ResultImage({ item }: ResultImageProps) {
	const [imageLoaded, setImageLoaded] = useState(false);

	const imageUrl = item.getDocumentValue('image');
	const itemName = item.getDocumentValue('itemname');

	return (
		<div className="hawk-results__item-image">
			<div style={imageLoaded ? {} : { overflow: 'hidden', width: '0px', height: '0px' }}>
				<img onLoad={() => setImageLoaded(true)} src={imageUrl} alt={`Image for ${itemName}`} />
			</div>

			{!imageLoaded ? (
				// if the main image hasn't loaded yet, show a placeholder
				<PlaceholderImage showSpinner={true} />
			) : null}
		</div>
	);
}

export default ResultImage;
