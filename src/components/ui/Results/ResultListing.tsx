import React from 'react';
import PlaceholderItem from './PlaceholderItem';
import Spinner from 'components/ui/Spinner';
import { default as DefaultResultItem, ResultItemProps } from './ResultItem';
import { useHawksearch } from 'components/StoreProvider';

export interface ResultsListingProps {
	ResultItem: React.ComponentType<ResultItemProps>;
}

function ResultListing({ ResultItem = DefaultResultItem }: ResultsListingProps) {
	const {
		store: { isLoading, searchResults },
	} = useHawksearch();

	const results = searchResults ? searchResults.Results : [];

	return (
		<ul className="hawk-results__listing" aria-label="search result">
			<Spinner isVisible={isLoading} />

			{results.length
				? // if we have results, display them
				  results.map(result => <ResultItem key={result.DocId} item={result} />)
				: // otherwise display placeholder items as we're loading
				  [...Array(12)].map((_, i) => <PlaceholderItem key={i} />)}
		</ul>
	);
}

export default ResultListing;
