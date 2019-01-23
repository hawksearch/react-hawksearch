import React, { useState } from 'react';

import { Result } from 'models/Search';
import PlaceholderImage from 'components/ui/Results/PlaceholderImage';

export interface ResultItemProps {
	item: Result;
}

function ResultItem({ item }: ResultItemProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	const itemName = item.getDocumentValue('itemname');

	return (
		<div className="hawk-results__item">
			<div className="hawk-results__item-image">
				<div style={isLoaded ? {} : { overflow: 'hidden', width: '0px', height: '0px' }}>
					<img
						onLoad={() => setIsLoaded(true)}
						src={item.getDocumentValue('image')}
						alt={`Image for ${itemName}`}
					/>
				</div>

				{!isLoaded ? <PlaceholderImage /> : null}
			</div>

			<div className="hawk-results__item-name">
				<span>{itemName}</span>
			</div>
		</div>
	);
}

export default ResultItem;
