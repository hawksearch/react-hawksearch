import React, { useState } from 'react';

import PlaceholderFacetValue from './PlaceholderFacetValue';

function PlaceholderFacet() {
	const [width] = useState(Math.round(Math.random() * (250 - 125) + 125));
	const [numValues] = useState(Math.round(Math.random() * (8 - 1) + 1));

	return (
		<div className="hawk-facet-rail__facet">
			<div className="hawk-facet-rail__facet-heading">
				<div className="hawk-facet-rail__facet-heading-placeholder" style={{ width: `${width}px` }} />
			</div>
			<div className="hawk-facet-rail__facet-body">
				<div className="hawk-facet-rail__facet-values hawk-facet-rail__facet-values-placeholder">
					<div className="hawk-facet-rail__facet-values-checkbox">
						<ul className="hawk-facet-rail__facet-list">
							{[...Array(numValues)].map((_, i) => (
								<PlaceholderFacetValue key={i} />
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlaceholderFacet;
