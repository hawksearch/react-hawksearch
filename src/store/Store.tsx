import React, { useContext, useEffect } from 'react';

import HawkClient from 'net/HawkClient';
import { useMergableState } from 'util/MergableState';
import { history } from 'util/History';
import { parseSearchQueryString, getSearchQueryString } from 'util/QueryString';
import { SearchResult, SearchRequest, Result } from 'models/Search';
import { Facet } from 'models/Facets';

class SearchStore {
	public searchResults?: SearchResult;

	public pendingSearch: Partial<SearchRequest>;
	public doHistory: boolean;

	public isLoading: boolean;

	public items?: Result[];
	public facets?: Facet[];
}

export interface SearchActor {
	/** Performs a search with the given keyword. */
	search(): Promise<void>;
	setSearch(search: Partial<SearchRequest>, doHistory?: boolean);
}

export function useHawkState(): [SearchStore, SearchActor] {
	const client = new HawkClient();

	const initialSearchQuery = parseSearchQueryString(location.search);
	const { keyword: initialKeyword, ...initialFacetSelections } = initialSearchQuery;

	const [state, setState] = useMergableState<SearchStore>({
		pendingSearch: {
			Keyword: initialKeyword || '',
			FacetSelections: initialFacetSelections,
		},
		// don't push history on the initial load of the component
		doHistory: false,
		isLoading: false,
	});

	useEffect(
		() => {
			// when the pending search's keyword or facet selections change, trigger a search
			search();
		},
		[state.pendingSearch.Keyword, state.pendingSearch.FacetSelections]
	);

	useEffect(() => {
		// listen to history so that when we navigate backward/forward, trigger a new search based off
		// the new query string
		const unlisten = history.listen(location => {
			const newSearchQuery = parseSearchQueryString(location.search);
			const { keyword: newKeyword, ...newFacetSelections } = newSearchQuery;

			setSearch(
				{
					Keyword: newKeyword || '',
					FacetSelections: newFacetSelections,
				},
				/*doHistory*/ false
			);
		});

		return () => {
			unlisten();
		};
	});

	async function search() {
		console.debug(
			'Searching for:',
			state.pendingSearch.Keyword,
			'& facet selections:',
			state.pendingSearch.FacetSelections
		);

		const searchQuery = { keyword: state.pendingSearch.Keyword, ...state.pendingSearch.FacetSelections };
		console.log(searchQuery);

		if (state.doHistory) {
			history.push({
				search: getSearchQueryString(searchQuery),
			});
		}

		setState({ isLoading: true });

		const searchResults = await client.search({
			ClientGuid: 'f51060e1c38446f0bacdf283390c37e8',
			Keyword: state.pendingSearch.Keyword,

			FacetSelections: state.pendingSearch.FacetSelections,
		});

		setState({ isLoading: false });

		if (searchResults) {
			console.warn('Search results:', searchResults);

			setState({
				searchResults,
				items: searchResults.Results,
				facets: searchResults.Facets,
			});
		}
	}

	function setSearch(pendingSearch: Partial<SearchRequest>, doHistory?: boolean) {
		if (doHistory === undefined) {
			doHistory = true;
		}

		setState(prevState => {
			return {
				pendingSearch: { ...prevState.pendingSearch, ...pendingSearch },
				doHistory,
			};
		});
	}

	const actor: SearchActor = {
		search,
		setSearch,
	};

	return [state, actor];
}

interface HawkContextValue {
	/** The store of data used throughout the application. */
	store: SearchStore;
	/**
	 * An interface that allows actions to be performed on the store (such as executing searches,
	 * changing pages, etc).
	 */
	actor: SearchActor;
}

export const HawkContext = React.createContext({} as HawkContextValue);

/**
 * This component acts as the global store for the hawksearch application state. Only one instance of this component
 * should exist, and it should be the root level component.
 */
export function HawkStoreProvider({ children }) {
	const [store, actor] = useHawkState();

	return <HawkContext.Provider value={{ store, actor }}>{children}</HawkContext.Provider>;
}

/**
 * Retrieves the global hawk store for use within a component.
 */
export function useHawkSearch() {
	return useContext(HawkContext);
}

export default SearchStore;
