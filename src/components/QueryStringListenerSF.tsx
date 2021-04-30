import { useEffect } from 'react';

import { useHawksearch } from './StoreProvider';
import { history } from 'util/History';
import { parseSearchQueryString, getSearchQueryString } from 'util/QueryString';

let doSearch = true;

function QueryStringListenerSF() {
	const { store, actor } = useHawksearch();

	useEffect(() => {
		// listen to history so that when we navigate backward/forward, trigger a new search based off
		// the new query string
		const unlisten = history.listen(location => {
			const searchRequest = parseSearchQueryString(location.search);

			actor.setSearch(
				searchRequest,
				// explicitly flag this next search as not needing to push additional history, since this search
				// _is_ the result of history.
				/*doHistory*/ false
			);
		});

		return () => {
			unlisten();
		};
	});

	useEffect(() => {
		// listen to changes in the pending search so that history records can be pushed to the browser's
		// query string

		if (store.doHistory) {
			// if we're pushing history, we don't want to to trigger a search as a result of this history
			// change
			doSearch = false;

			history.push({
				search: getSearchQueryString(store.pendingSearch),
			});
		}
	}, [store.pendingSearch]);

	return null;
}

export default QueryStringListenerSF;
