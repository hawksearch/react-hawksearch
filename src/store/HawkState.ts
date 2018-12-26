import { useEffect } from 'react';
import axios, { CancelToken } from 'axios';

import { SearchStore, SearchActor, FacetSelectionState } from 'store/Store';
import HawkClient from 'net/HawkClient';
import { Response, Request } from 'models/Search';
import { useMergableState } from 'util/MergableState';
import { useHawkConfig } from 'components/ConfigProvider';
import { Facet, Value } from 'models/Facets';

export function useHawkState(initialSearch?: Partial<Request>): [SearchStore, SearchActor] {
	const client = new HawkClient();

	const [store, setStore] = useMergableState(
		new SearchStore({
			pendingSearch: initialSearch || {
				Keyword: '',
				FacetSelections: {},
			},
			isLoading: true,
		}),
		SearchStore
	);

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
		[store.pendingSearch]
	);

	/**
	 * Performs a search with the currently configured pending search request. The search request can be
	 * configured via the `setSearch` method. This method usually doesn't need to be called directly, as
	 * the `StoreProvider` component will usually trigger searches directly in response to calls to
	 * `setSearch`.
	 * @returns A promise that resolves when the search request has been completed.
	 */
	async function search(cancellationToken?: CancelToken): Promise<void> {
		console.debug('Searching for:', store.pendingSearch);

		setStore({ isLoading: true });

		let searchResults: Response | null = null;

		try {
			searchResults = await client.search(
				{
					// the search request being executed is spread from the pendingSearch
					...store.pendingSearch,

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

		setStore({ isLoading: false });

		if (searchResults) {
			if (!searchResults.Success) {
				console.error('Search result error:', searchResults);
			} else {
				console.warn('Search results:', searchResults);

				setStore({
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
	function setSearch(pendingSearch: Partial<Request>, doHistory?: boolean): void {
		if (doHistory === undefined) {
			doHistory = true;
		}

		setStore(prevState => {
			return {
				pendingSearch: { ...prevState.pendingSearch, ...pendingSearch },
				doHistory,
			};
		});
	}

	/**
	 * Selects a facet value for the next search request that will be executed. Internally, this will call
	 * `setSearch` to configure the next search with this selected facet.
	 * @param facet The facet for which the value is being selected.
	 * @param facetValue The facet value being selected.
	 * @param negate  Whether or not this selection is considered a negation.
	 */
	function selectFacet(facet: Facet | string, facetValue: Value | string, negate?: boolean): void {
		if (negate === undefined) {
			negate = false;
		}

		const facetName = typeof facet === 'string' ? facet : facet.Name;
		const facetField = typeof facet === 'string' ? facet : facet.ParamName ? facet.ParamName : facet.Field;

		const valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
		const valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

		if (!valueValue) {
			console.error(`Facet ${facetName} (${facetField}) has no facet value for ${valueLabel}`);
			return;
		}

		let facetSelections = store.pendingSearch.FacetSelections;

		if (!facetSelections) {
			facetSelections = {};
		}

		if (!facetSelections[facetField]) {
			facetSelections[facetField] = [];
		}

		const { state: selState, selectionIndex } = store.isFacetSelected(facet, facetValue);

		if (selState === FacetSelectionState.Selected || selState === FacetSelectionState.Negated) {
			// we're selecting this facet, and it's already selected

			// first, remove it from our selections
			facetSelections[facetField]!.splice(selectionIndex!, 1);

			if (
				(selState === FacetSelectionState.Selected && negate) ||
				(selState === FacetSelectionState.Negated && !negate)
			) {
				// if we're toggling from negation to non-negation or vice versa, then push the new selection
				facetSelections[facetField]!.push(negate ? `-${valueValue}` : valueValue);
			} else {
				// if we're not toggling the negation, nothing to do because we already removed the selection above
			}
		} else {
			// not selected, so we want to select it
			facetSelections[facetField]!.push(negate ? `-${valueValue}` : valueValue);
		}

		if (facetSelections[facetField]!.length === 0) {
			// clean up any facets that no longer have any selected facet values
			delete facetSelections[facetField];
		}

		setSearch({ FacetSelections: facetSelections });
	}

	const actor: SearchActor = {
		search,
		setSearch,
		selectFacet,
	};

	return [store, actor];
}
