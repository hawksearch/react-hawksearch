import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import ResultItem from './ResultItem';
import Spinner from 'components/ui/Spinner';
import PlaceholderItem from './PlaceholderItem';

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
			<Spinner isVisible={isLoading} />

			{results.length
				? // if we have results, display them
				  results.map(result => <ResultItem key={result.DocId} item={result} />)
				: // otherwise display placeholder items as we're loading
				  [...Array(12)].map((_, i) => <PlaceholderItem key={i} />)}
		</div>
	);
}

export default ResultListing;
