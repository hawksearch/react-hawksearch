import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import ResultItem from './ResultItem';

function ResultListing() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	return (
		<div className="hawk__results__listing">
			{isLoading ? <span>Loading...</span> : null}

			<div>
				{searchResults &&
					// TODO: sort search results
					searchResults.Results.map(result => <ResultItem key={result.DocId} item={result} />)}
			</div>
		</div>
	);
}

export default ResultListing;
