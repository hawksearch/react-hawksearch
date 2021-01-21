import React from 'react';
import { useHawksearch } from 'components/StoreProvider';

function AdjustedKeyword() {
	const {
		store: { searchResults },
	} = useHawksearch();
	if (searchResults && searchResults.AdjustedKeyword) {
		return (
			<div>
				Showing results for <b>{searchResults.AdjustedKeyword}</b>. Search instead for{' '}
				<b>{searchResults.Keyword}</b>.
			</div>
		);
	}
	return null;
}

export default AdjustedKeyword;
