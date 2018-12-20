import { useEffect } from 'react';
import axios, { CancelToken } from 'axios';

import HawkClient from 'net/HawkClient';
import { useMergableState } from 'util/MergableState';
import { Response, Request } from 'models/Search';
import { useHawkConfig } from 'components/ConfigProvider';

export class SearchStore {
	public pendingSearch: Partial<Request>;
	public doHistory: boolean;

	public isLoading: boolean;
	public searchResults?: Response;

	constructor(initialSearch?: Partial<Request>) {
		this.pendingSearch = initialSearch || {
			Keyword: '',
			FacetSelections: {},
		};

		this.isLoading = true;
	}

	/**
	 * Returns whether or not this is the initial load of the search results.
	 */
	get isInitialLoad() {
		return this.isLoading && !this.searchResults;
	}
}

export interface SearchActor {
	/**
	 * Performs a search with the currently configured pending search request. The search request can be
	 * configured via the `setSearch` method. This method usually doesn't need to be called directly, as
	 * the `StoreProvider` component will usually trigger searches directly in response to calls to
	 * `setSearch`.
	 * @returns A promise that resolves when the search request has been completed.
	 */
	search(): Promise<void>;

	/**
	 * Configures the next search request that will be executed.
	 * @param search The partial search request object. This will be merged with previous calls to `setSearch`.
	 * @param doHistory Whether or not this search request will push a history entry into the browser. If
	 * 					not specified, the default is `true`.
	 */
	setSearch(search: Partial<Request>, doHistory?: boolean);
}

export function useHawkState(initialSearch?: Partial<Request>): [SearchStore, SearchActor] {
	const client = new HawkClient();

	const [state, setState] = useMergableState(new SearchStore(initialSearch));

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
		[state.pendingSearch]
	);

	async function search(cancellationToken?: CancelToken) {
		console.debug('Searching for:', state.pendingSearch);

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
