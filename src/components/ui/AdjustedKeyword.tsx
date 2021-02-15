import React from 'react';
import { useHawkSearch } from 'components/StoreProvider';

function AdjustedKeyword() {
	const {
		store: { searchResults },
		actor,
	} = useHawkSearch();
	if (searchResults && searchResults.AdjustedKeyword) {
		return (
			<div className="hawk__adjusted-keyword">
				Showing results for <b>{searchResults.AdjustedKeyword}</b>. Search instead for{' '}
				<b
					onClick={() =>
						actor.setSearch({
							Keyword: searchResults.Keyword,
						})
					}
				>
					{searchResults.Keyword}
				</b>
				.
			</div>
		);
	}
	return null;
}

export default AdjustedKeyword;
