import React from 'react';

function PlaceholderItem() {
	return (
		<div className="hawk-results__item">
			<div className="hawk-results__item-image">
				<div className="hawk-results__item-placeholder" />
			</div>

			<div className="hawk-results__item-name">Loading...</div>
		</div>
	);
}

export default PlaceholderItem;
