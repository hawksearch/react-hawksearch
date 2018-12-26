import { useEffect } from 'react';
import axios, { CancelToken } from 'axios';

import { useHawkConfig } from 'components/ConfigProvider';
import HawkClient from 'net/HawkClient';
import { Response, Request } from 'models/Search';
import { Value, Facet } from 'models/Facets';
import { useMergableState } from 'util/MergableState';

export class SearchStore {
	/** This represents the next search request that will be executed. */
	public pendingSearch: Partial<Request>;
	/**
	 * Whether or not the next search request will perform history actions (pushing the search into browser
	 * history).
	 */
	public doHistory: boolean;

	/** Whether or not a search request is waiting for completion. */
	public isLoading: boolean;

	/** The results of the last search request, if one has been performed. Otherwise, `undefined`. */
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

export enum FacetSelectionState {
	/** The facet value is not selected. */
	NotSelected,
	/** The facet value is selected. */
	Selected,
	/** The facet value is selected, but negated. */
	Negated,
}

export interface SelectionInfo {
	/** The facet value selection state. */
	state: FacetSelectionState;

	/**
	 * If the facet value is `FacetSelectionState.Selected` or `FacetSelectionState.Negated`, this is the value of
	 * the facet value. For negated facet values this will be prefixed with the negation character `'-'`.
	 */
	selectedValue?: string;
	/**
	 * If the facet value is `FacetSelectionState.Selected` or `FacetSelectionState.Negated`, this is the index
	 * into the `pendingSearch.FacetSelections[facetName]` array for this facet value.
	 */
	selectionIndex?: number;
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
	 * Configures the next search request that will be executed. This will also execute a search in response to
	 * the next search request changing.
	 * @param search The partial search request object. This will be merged with previous calls to `setSearch`.
	 * @param doHistory Whether or not this search request will push a history entry into the browser. If
	 * 					not specified, the default is `true`.
	 */
	setSearch(search: Partial<Request>, doHistory?: boolean);

	/**
	 * Determines whether or not the given facet and facet value is selected, and returns info regarding the selection.
	 * @param facet The facet for which the facet value will be checked for selection.
	 * @param facetValue The facet value that will be checked for selection.
	 */
	isFacetSelected(facet: Facet, facetValue: Value): SelectionInfo;

	/**
	 * Selects a facet value for the next search request that will be executed. Internally, this will call
	 * `setSearch` to configure the next search with this selected facet.
	 * @param facet The facet for which the value is being selected.
	 * @param facetValue The facet value being selected.
	 * @param negate  Whether or not this selection is considered a negation.
	 */
	selectFacet(facet: Facet, facetValue: Value, negate?: boolean);
}

export function useHawkState(initialSearch?: Partial<Request>): [SearchStore, SearchActor] {
	const client = new HawkClient();

	const [state, setState] = useMergableState(new SearchStore(initialSearch));

	const { config } = useHawkConfig();

	useEffect(
		() => {
			// when the pending search changes, trigger a search
			const cts = axios.CancelToken.source();
			search(cts.token);

			return () => {
				cts.cancel();
			};
		},
		[state.pendingSearch]
	);

	/**
	 * Performs a search with the currently configured pending search request. The search request can be
	 * configured via the `setSearch` method. This method usually doesn't need to be called directly, as
	 * the `StoreProvider` component will usually trigger searches directly in response to calls to
	 * `setSearch`.
	 * @returns A promise that resolves when the search request has been completed.
	 */
	async function search(cancellationToken?: CancelToken) {
		console.debug('Searching for:', state.pendingSearch);

		setState({ isLoading: true });

		let searchResults: Response | null = null;

		try {
			searchResults = await client.search(
				{
					// the search request being executed is spread from the pendingSearch
					...state.pendingSearch,

					// and override some of the request fields with config values
					ClientGuid: config.clientGuid,
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
			if (!searchResults.Success) {
				console.error('Search result error:', searchResults);
			} else {
				console.warn('Search results:', searchResults);

				setState({
					searchResults,
				});
			}
		}
	}

	/**
	 * Configures the next search request that will be executed. This will also execute a search in response to
	 * the next search request changing.
	 * @param search The partial search request object. This will be merged with previous calls to `setSearch`.
	 * @param doHistory Whether or not this search request will push a history entry into the browser. If
	 * 					not specified, the default is `true`.
	 */
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

	/**
	 * Determines whether or not the given facet and facet value is selected, and returns info regarding the selection.
	 * @param facet The facet for which the facet value will be checked for selection.
	 * @param facetValue The facet value that will be checked for selection.
	 */
	function isFacetSelected(facet: Facet, facetValue: Value): SelectionInfo {
		if (!facetValue.Value) {
			console.error(`Facet ${facet.Name} (${facet.Field}) has no facet value for ${facetValue.Label}`);
			return { state: FacetSelectionState.NotSelected };
		}

		const facetName = facet.ParamName ? facet.ParamName : facet.Field;

		const facetSelections = state.pendingSearch.FacetSelections;

		if (!facetSelections || !facetSelections[facetName]) {
			return { state: FacetSelectionState.NotSelected };
		}

		const selectionIdx = facetSelections[facetName]!.indexOf(facetValue.Value);
		const negationIdx = facetSelections[facetName]!.indexOf(`-${facetValue.Value}`);

		if (selectionIdx !== -1) {
			// if the exact facet value exists, then we're normally selected
			return {
				state: FacetSelectionState.Selected,
				selectedValue: facetValue.Value,
				selectionIndex: selectionIdx,
			};
		} else if (negationIdx !== -1) {
			// if the facet value is selected but prefixed with a -, then we're negated
			return {
				state: FacetSelectionState.Negated,
				selectedValue: `-${facetValue.Value}`,
				selectionIndex: negationIdx,
			};
		}

		return { state: FacetSelectionState.NotSelected };
	}

	/**
	 * Selects a facet value for the next search request that will be executed. Internally, this will call
	 * `setSearch` to configure the next search with this selected facet.
	 * @param facet The facet for which the value is being selected.
	 * @param facetValue The facet value being selected.
	 * @param negate  Whether or not this selection is considered a negation.
	 */
	function selectFacet(facet: Facet, facetValue: Value, negate?: boolean) {
		if (negate === undefined) {
			negate = false;
		}

		const facetName = facet.ParamName ? facet.ParamName : facet.Field;

		if (!facetValue.Value) {
			console.error(`Facet ${facet.Name} (${facet.Field}) has no facet value for ${facetValue.Label}`);
			return;
		}

		let facetSelections = state.pendingSearch.FacetSelections;

		if (!facetSelections) {
			facetSelections = {};
		}

		if (!facetSelections[facetName]) {
			facetSelections[facetName] = [];
		}

		const { state: selState, selectionIndex } = isFacetSelected(facet, facetValue);

		if (selState === FacetSelectionState.Selected || selState === FacetSelectionState.Negated) {
			// we're selecting this facet, and it's already selected

			// first, remove it from our selections
			facetSelections[facetName]!.splice(selectionIndex!, 1);

			if (
				(selState === FacetSelectionState.Selected && negate) ||
				(selState === FacetSelectionState.Negated && !negate)
			) {
				// if we're toggling from negation to non-negation or vice versa, then push the new selection
				facetSelections[facetName]!.push(negate ? `-${facetValue.Value}` : facetValue.Value);
			} else {
				// if we're not toggling the negation, nothing to do because we already removed the selection above
			}
		} else {
			// not selected, so we want to select it
			facetSelections[facetName]!.push(negate ? `-${facetValue.Value}` : facetValue.Value);
		}

		if (facetSelections[facetName]!.length === 0) {
			// clean up any facets that no longer have any selected facet values
			delete facetSelections[facetName];
		}

		setSearch({ FacetSelections: facetSelections });
	}

	const actor: SearchActor = {
		search,
		setSearch,
		isFacetSelected,
		selectFacet,
	};

	return [state, actor];
}
