import React, { useEffect, useState } from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { deleteCookie, getCookie, getParsedObject } from 'helpers/utils';

function RecentSearches() {
	const { facet } = useFacet();
	const {
		actor,
		store: { pendingSearch },
	} = useHawksearch();
	const cookie = getCookie(facet.FacetType);
	const dictRecentSearch = getParsedObject(cookie);
	const [recentSearch, setRecentSearch] = useState(dictRecentSearch);

	// NOTE: If user search with the new keyword it should update the dictionary
	useEffect(() => {
		setRecentSearch(getParsedObject(cookie));
	}, [pendingSearch.Keyword]);

	function setKeyword(keyword) {
		actor.setSearch(
			{
				Keyword: keyword,
				IgnoreSpellcheck: false,
			},
			true
		);
	}

	function clearRecentSearch() {
		setRecentSearch([]);
		deleteCookie(facet.FacetType);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			{Object.keys(recentSearch).length ? (
				<div className="hawk-facet-rail__facet-values-recent-search">
					{Object.keys(recentSearch).map((item, index) => {
						return (
							<div key={index} onClick={() => setKeyword(item)}>
								{decodeURIComponent(item)} ({recentSearch[item]})
							</div>
						);
					})}
					<button onClick={() => clearRecentSearch()}>Clear All</button>
				</div>
			) : (
				<div>Recent searches are empty</div>
			)}
		</div>
	);
}

export default RecentSearches;
