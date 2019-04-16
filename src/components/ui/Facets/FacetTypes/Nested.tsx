import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';
import { FacetSelectionState } from 'store/Store';

function Nested() {
	const { store } = useHawkSearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	return (	
        <div>I am here</div>
    );
}

export default Nested;
