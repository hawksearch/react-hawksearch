import { useEffect } from 'react';
import { useHawksearch } from './StoreProvider';

function RedirectURLListener() {
	const { store } = useHawksearch();
	useEffect(() => {
		if (store.searchResults && store.searchResults.Redirect.Location) {
			// NOTE: This will redirect the parent window to the given URL
			window.top.location.href = store.searchResults.Redirect.Location;
		}
	}, [store.searchResults]);

	return null;
}

export default RedirectURLListener;
