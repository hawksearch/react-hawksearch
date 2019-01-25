import React, { useState } from 'react';

function PlaceholderFacetValue() {
	const [width] = useState(Math.round(Math.random() * (200 - 100) + 100));

	return (
		<li className="hawk-facet-rail__facet-list-item">
			<span className="hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox-placeholder" />

			<button className="hawk-facet-rail__facet-btn">
				<span className="hawk-facet-rail__facet-name">
					<div className="hawk-facet-rail__facet-name-placeholder" style={{ width: `${width}px` }} />
				</span>
			</button>
		</li>
	);
}

export default PlaceholderFacetValue;
