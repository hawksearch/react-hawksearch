import React, { useEffect } from 'react';

import { useHawkStore } from 'store/Store';
import { Search } from 'ui';

function App() {
	const { storeMutator } = useHawkStore();

	useEffect(() => {
		storeMutator.search('');
	}, []);

	return <Search />;
}

export default App;
