import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import ToolRow from './ToolRow';
import ResultListing from './ResultListing';

function Results() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	if ((!searchResults || searchResults.Results.length === 0) && !isLoading) {
		return <span>No Results</span>;
	}

	return (
		<div className="hawk__results">
			<ToolRow />

			<ResultListing />

			<ToolRow />
		</div>
	);
}

export default Results;
