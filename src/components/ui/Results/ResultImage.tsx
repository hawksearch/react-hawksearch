import React, { useState } from 'react';

import { Result } from 'models/Search';
import PlaceholderImage from './PlaceholderImage';

export interface ResultImageProps {
	item: Result;
	websiteUrl?: string;
	itemTitleFieldName?: string;
	imageUrlFieldName?: string;
	onLoadCallBack?: () => void;
}

function ResultImage({ item, websiteUrl, itemTitleFieldName, imageUrlFieldName, onLoadCallBack }: ResultImageProps) {
	const [imageLoaded, setImageLoaded] = useState(false);

	let imageUrl = imageUrlFieldName ? item.getDocumentValue(imageUrlFieldName) : item.getDocumentValue('image');
	if (!imageUrl) {
		return null;
	}

	const itemName = itemTitleFieldName ? item.getDocumentValue(itemTitleFieldName) : item.getDocumentValue('itemname');

	const absoluteUrlTester = new RegExp('^https?://|^//', 'i');
	if (!absoluteUrlTester.test(imageUrl) && websiteUrl) {
		imageUrl = websiteUrl + imageUrl;
	}

	return (
		<div className="hawk-results__item-image">
			<div style={imageLoaded ? {} : { overflow: 'hidden', width: '0px', height: '0px' }}>
				<img
					onLoad={() => {
						if (onLoadCallBack) {
							onLoadCallBack();
						}
						setImageLoaded(true);
					}}
					src={imageUrl}
					alt={`Image for ${itemName}`}
				/>
			</div>

			{!imageLoaded ? (
				// if the main image hasn't loaded yet, show a placeholder
				<PlaceholderImage showSpinner={true} />
			) : null}
		</div>
	);
}

export default ResultImage;
