import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import ToolRow from './ToolRow';
import ResultListing from './ResultListing';
import Selections from '../Facets/Selections';

function Results() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	if ((!searchResults || searchResults.Results.length === 0) && !isLoading) {
		return <span>No Results</span>;
	}

	return (
		<div className="hawk-results">
			<Selections />

			<ToolRow />

			<ResultListing />

			<ToolRow />
		</div>
	);
}

export default Results;
