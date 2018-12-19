import React, { useEffect } from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { history } from 'util/History';
import { parseSearchQueryString, getSearchQueryString } from 'util/QueryString';

function QueryStringListener() {
	const { store, actor } = useHawkSearch();

	useEffect(() => {
		// listen to history so that when we navigate backward/forward, trigger a new search based off
		// the new query string
		const unlisten = history.listen(location => {
			const searchQuery = parseSearchQueryString(location.search);
			const { keyword, sort, pg, mpp, ...facetSelections } = searchQuery;

			actor.setSearch(
				{
					Keyword: keyword,
					PageNo: pg,
					SortBy: sort,
					MaxPerPage: mpp,
					FacetSelections: facetSelections,
				},
				// explicitly flag this next search as not needing to push additional history, since this search
				// _is_ the result of history.
				/*doHistory*/ false
			);
		});

		return () => {
			unlisten();
		};
	});

	useEffect(
		() => {
			// listen to changes in the pending search so that history records can be pushed to the browser's
			// query string

			const searchQuery = {
				keyword: store.pendingSearch.Keyword,
				sort: store.pendingSearch.SortBy,
				pg: store.pendingSearch.PageNo,
				mpp: store.pendingSearch.MaxPerPage,
				...store.pendingSearch.FacetSelections,
			};

			console.log(searchQuery);

			if (store.doHistory) {
				history.push({
					search: getSearchQueryString(searchQuery),
				});
			}
		},
		[
			store.pendingSearch.Keyword,
			store.pendingSearch.SortBy,
			store.pendingSearch.PageNo,
			store.pendingSearch.MaxPerPage,
			store.pendingSearch.FacetSelections,
		]
	);

	return <></>;
}

export default QueryStringListener;
