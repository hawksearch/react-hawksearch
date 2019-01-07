import React from 'react';
import FacetList from './FacetList';

function FacetRail() {
	return (
		<div className="hawk-facet-rail">
			<div className="hawk-facet-rail__heading">Narrow Results</div>

			<FacetList />
		</div>
	);
}

export default FacetRail;
