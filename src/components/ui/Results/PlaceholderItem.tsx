import React from 'react';

import PlaceholderImage from 'components/ui/Results/PlaceholderImage';

function PlaceholderItem() {
	return (
		<div className="hawk-results__item">
			<div className="hawk-results__item-image">
				<PlaceholderImage />
			</div>

			<div className="hawk-results__item-name">Loading...</div>
		</div>
	);
}

export default PlaceholderItem;
