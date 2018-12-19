import { useEffect } from 'react';
import axios, { CancelToken } from 'axios';

import HawkClient from 'net/HawkClient';
import { useMergableState } from 'util/MergableState';
import { Response, Request, Result } from 'models/Search';
import { Facet } from 'models/Facets';
import { useHawkConfig } from 'components/ConfigProvider';

export class SearchStore {
	public searchResults?: Response;

	public pendingSearch: Partial<Request>;
	public doHistory: boolean;

	public isLoading: boolean;

	public items?: Result[];
	public facets?: Facet[];
}

export interface SearchActor {
	/** Performs a search with the given keyword. */
	search(): Promise<void>;
	setSearch(search: Partial<Request>, doHistory?: boolean);
}

export function useHawkState(initialSearch?: Partial<Request>): [SearchStore, SearchActor] {
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

	const { config } = useHawkConfig();

	useEffect(
		() => {
			// when the pending search's keyword or facet selections change, trigger a search
			const cts = axios.CancelToken.source();
			search(cts.token);

			return () => {
				cts.cancel();
			};
		},
		[
			state.pendingSearch.Keyword,
			state.pendingSearch.SortBy,
			state.pendingSearch.PageNo,
			state.pendingSearch.MaxPerPage,
			state.pendingSearch.FacetSelections,
		]
	);

	async function search(cancellationToken?: CancelToken) {
		console.debug(
			'Searching for:',
			state.pendingSearch.Keyword,
			'& facet selections:',
			state.pendingSearch.FacetSelections
		);

		setState({ isLoading: true });

		let searchResults: Response | null = null;

		try {
			searchResults = await client.search(
				{
					ClientGuid: config.clientGuid,

					Keyword: state.pendingSearch.Keyword,
					PageNo: state.pendingSearch.PageNo,
					SortBy: state.pendingSearch.SortBy,
					MaxPerPage: state.pendingSearch.MaxPerPage,

					FacetSelections: state.pendingSearch.FacetSelections,
				},
				cancellationToken
			);
		} catch (error) {
			if (axios.isCancel(error)) {
				// if the request was cancelled, it's because this component was updated
				console.warn('Search request cancelled', error);
				return;
			}

			console.error('Search request error:', error);
		}

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

	function setSearch(pendingSearch: Partial<Request>, doHistory?: boolean) {
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
