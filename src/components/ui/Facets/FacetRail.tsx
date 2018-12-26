import React from 'react';

import Selections from './Selections';
import Facets from './Facets';

function FacetRail() {
	return (
		<div style={{ borderRight: '1px solid black' }}>
			<Selections />

			<Facets />
		</div>
	);
}

export default FacetRail;
