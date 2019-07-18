import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

function SearchResultsLabel() {
	const {
		store: { pendingSearch },
	} = useHawkSearch();

	if (!pendingSearch.Keyword) {
		// no selections, so render nothing
		return null;
	}

	return (
		<div className="hawk-facet-rail__results-label">
			<h3>Search Results {pendingSearch.Keyword ? 'for ' + pendingSearch.Keyword : null}</h3>
		</div>
	);
}

export default SearchResultsLabel;
