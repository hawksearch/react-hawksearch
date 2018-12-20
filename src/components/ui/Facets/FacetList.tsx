import React from 'react';

import Selections from './Selections';
import Facets from './Facets';

function FacetList() {
	return (
		<div style={{ borderRight: '1px solid black' }}>
			<Selections />

			<Facets />
		</div>
	);
}

export default FacetList;
