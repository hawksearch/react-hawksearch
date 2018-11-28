import React, { useEffect } from 'react';
import { useHawkStore } from 'store/Store';

function App() {
	const { storeMutator } = useHawkStore();

	useEffect(() => {
		storeMutator.search('');
	}, []);

	return (
		<>
			<ItemList />
			<hr />
			<ItemList />
		</>
	);
}

/* tslint:disable:no-string-literal */
function ItemList() {
	const { store } = useHawkStore();

	return store.Items ? (
		<div>
			{store.Items.map(item => (
				<li key={item.DocId}>{item.Document['name']}</li>
			))}
		</div>
	) : (
		<span>No results</span>
	);
}

export default App;
