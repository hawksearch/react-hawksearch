import React from 'react';

import PlaceholderImage from './PlaceholderImage';

function PlaceholderItem() {
	return (
		<div className="hawk-results__item">
			<div className="hawk-results__item-image">
				<PlaceholderImage showSpinner={false} />
			</div>

			<div className="hawk-results__item-name">
				<div className="hawk-results__item-name-placeholder" />
			</div>
		</div>
	);
}

export default PlaceholderItem;
