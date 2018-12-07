import { useEffect } from 'react';

import HawkClient from 'net/HawkClient';
import { useMergableState } from 'util/MergableState';
import { SearchResult, SearchRequest, Result } from 'models/Search';
import { Facet } from 'models/Facets';

export class SearchStore {
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

export function useHawkState(initialSearch?: Partial<SearchRequest>): [SearchStore, SearchActor] {
	const client = new HawkClient();

	const [state, setState] = useMergableState<SearchStore>({
		pendingSearch: initialSearch || {
			Keyword: '',
			FacetSelections: {},
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

	async function search() {
		console.debug(
			'Searching for:',
			state.pendingSearch.Keyword,
			'& facet selections:',
			state.pendingSearch.FacetSelections
		);

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
