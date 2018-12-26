import React from 'react';

import Selections from './Selections';
import FacetList from './FacetList';

function FacetRail() {
	return (
		<div style={{ borderRight: '1px solid black' }}>
			<Selections />

			<FacetList />
		</div>
	);
}

export default FacetRail;
