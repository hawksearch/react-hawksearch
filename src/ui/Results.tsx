import React from 'react';

import { useHawkStore } from 'store/Store';

/* tslint:disable:no-string-literal */
function Results() {
	const { store } = useHawkStore();

	if (store.isLoading) {
		return <span>Loading...</span>;
	}

	if (!store.items || store.items.length === 0) {
		return <span>No Results</span>;
	}

	return (
		<>
			<span>Results:</span>
			<div>
				{store.items.map(item => (
					<li key={item.DocId}>{item.Document['name']}</li>
				))}
			</div>
		</>
	);
}

export default Results;
