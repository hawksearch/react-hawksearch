import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

/* tslint:disable:no-string-literal */
function Results() {
	const {
		store: { isLoading, searchResults },
	} = useHawkSearch();

	if ((!searchResults || searchResults.Results.length === 0) && !isLoading) {
		return <span>No Results</span>;
	}

	return (
		<>
			<span>Results: </span>

			{isLoading ? <span>Loading...</span> : null}

			<div>
				<ul>
					{searchResults &&
						searchResults.Results.map(
							item => item.Document && <li key={item.DocId}>{item.Document['itemname']}</li>
						)}
				</ul>
			</div>
		</>
	);
}

export default Results;
