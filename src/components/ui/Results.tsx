import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

/* tslint:disable:no-string-literal */
function Results() {
	const { store } = useHawkSearch();

	if ((!store.items || store.items.length === 0) && !store.isLoading) {
		return <span>No Results</span>;
	}

	return (
		<>
			<span>Results: </span>

			{store.isLoading ? <span>Loading...</span> : null}

			<div>{store.items && store.items.map(item => <li key={item.DocId}>{item.Document['itemname']}</li>)}</div>
		</>
	);
}

export default Results;
