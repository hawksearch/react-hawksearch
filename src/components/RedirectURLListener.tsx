import { useEffect } from 'react';
import { useHawksearch } from './StoreProvider';

function RedirectURLListener() {
	const { store } = useHawksearch();
	useEffect(() => {
		if (store.searchResults && store.searchResults.Redirect.Location) {
			window.location.href = store.searchResults.Redirect.Location;
		}
	}, [store.searchResults]);

	return null;
}

export default RedirectURLListener;
