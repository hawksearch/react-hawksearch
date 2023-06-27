import { getSearchQueryString, parseSearchQueryString } from 'util/QueryString';

import AuthToken from './AuthToken';
import { history } from 'util/History';
import { useEffect } from 'react';
import { useHawksearch } from './StoreProvider';

let doSearch = true;

function QueryStringListener() {
	const { store, actor } = useHawksearch();
	const performSearch = () => {
		const searchRequest = parseSearchQueryString(location.search);
		actor.setSearch(
			searchRequest,
			// explicitly flag this next search as not needing to push additional history, since this search
			// _is_ the result of history.
			/*doHistory*/ false
		);
	};

	useEffect(() => {
		// listen to history so that when we navigate backward/forward, trigger a new search based off
		// the new query string
		const unlisten = history.listen(location => {
			if (!doSearch) {
				// if the previous history change specified that we shouldn't do a search, clear the flag and bail
				doSearch = true;
				return;
			}

			performSearch();
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
				search: getSearchQueryString(store.pendingSearch, store),
			});
		}
	}, [store.pendingSearch]);

	// Extract access token and refresh token from query string on load
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		AuthToken.setTokens(params.get('token') || '', (params.get('refreshToken') || '').replace(' ', '+') || '');
		performSearch();
	}, []);

	return null;
}

export default QueryStringListener;
