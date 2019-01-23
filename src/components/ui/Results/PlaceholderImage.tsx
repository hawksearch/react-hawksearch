import React, { useState } from 'react';

function PlaceholderImage() {
	const [height] = useState(Math.random() * (175 - 125) + 125);

	return <div className="hawk-results__item-placeholder" style={{ height: `${height}px` }} />;
}

export default PlaceholderImage;
