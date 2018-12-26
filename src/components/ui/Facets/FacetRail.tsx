import React from 'react';

import Selections from './Selections';
import FacetList from './FacetList';

function FacetRail() {
	return (
		<div className="hawk__facet-rail">
			<div className="hawk__facet-rail__heading">Narrow Results</div>

			<Selections />

			<FacetList />
		</div>
	);
}

export default FacetRail;
