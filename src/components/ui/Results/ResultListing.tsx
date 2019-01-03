import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import ResultItem from './ResultItem';

function ResultListing() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	let results = searchResults ? searchResults.Results : [];

	// sort by score, descending
	results = results.sort((a, b) => {
		return b.Score - a.Score;
	});

	return (
		<div className="hawk-results__listing">
			{isLoading ? <span>Loading...</span> : null}

			{results.map(result => (
				<ResultItem key={result.DocId} item={result} />
			))}
		</div>
	);
}

export default ResultListing;