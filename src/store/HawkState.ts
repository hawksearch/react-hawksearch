import { useEffect } from 'react';
import axios, { CancelToken } from 'axios';

import { SearchStore, FacetSelectionState } from 'store/Store';
import HawkClient from 'net/HawkClient';
import { Response, Request, FacetSelections } from 'models/Search';
import { useMergableState } from 'util/MergableState';
import { useHawkConfig } from 'components/ConfigProvider';
import { Facet, Value } from 'models/Facets';

export interface SearchActor {
	/**
	 * Performs a search with the currently configured pending search request. The search request can be
	 * configured via the `setSearch` method. This method usually doesn't need to be called directly, as
	 * the `StoreProvider` component will usually trigger searches directly in response to calls to
	 * `setSearch`.
	 * @returns A promise that resolves when the search request has been completed.
	 */
	search(cancellationToken?: CancelToken): Promise<void>;

	/**
	 * Configures the next search request that will be executed. This will also execute a search in response to
	 * the next search request changing.
	 * @param search The partial search request object. This will be merged with previous calls to `setSearch`.
	 * @param doHistory Whether or not this search request will push a history entry into the browser. If
	 * 					not specified, the default is `true`.
	 */
	setSearch(search: Partial<Request>, doHistory?: boolean): void;

	/**
	 * Toggles a facet value for the next search request that will be executed. If the given facet had previously
	 * been selected, it will be unselected. If the negation state of a selected facet is changed, the selection
	 * will have its negation state changed. Internally, this will call `setSearch` to configure the next search
	 * with this selected facet.
	 * @param facet The facet for which the value is being selected.
	 * @param facetValue The facet value being selected.
	 * @param negate  Whether or not this selection is considered a negation.
	 */
	toggleFacetValue(facet: Facet | string, facetValue: Value | string, negate?: boolean): void;

	/**
	 * Entirely clears all the values of the given facet from the current selection.
	 * @param facet The facet to clear.
	 */
	clearFacet(facet: Facet | string): void;

	/**
	 * Clears a given facet value of the given facet from the current selection.
	 * @param facet The facet to clear.
	 * @param facetValue The facet value to clear.
	 */
	clearFacetValue(facet: Facet | string, facetValue?: Value | string): void;

	/**
	 * Clears all selected facets from the current selection.
	 */
	clearAllFacets(): void;
}

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
					searchResults: new Response(searchResults),
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
	 * Sets the facet selections and search within configuration for the next search request. This will also
	 * clear the page number of the next request to display the first page of results.
	 * @param selections The facet selections to set.
	 * @param searchWithin The search within value to set.
	 */
	function setSearchSelections(selections?: FacetSelections, searchWithin?: string) {
		setSearch({
			FacetSelections: selections,
			SearchWithin: searchWithin,

			// when we change facet selections, also clear the current page so that we navigate
			// back to the first page of results
			PageNo: undefined,
		});
	}

	/**
	 * Toggles a facet value for the next search request that will be executed. Internally, this will call
	 * `setSearch` to configure the next search with this selected facet.
	 * @param facet The facet for which the value is being selected.
	 * @param facetValue The facet value being selected.
	 * @param negate  Whether or not this selection is considered a negation.
	 */
	function toggleFacetValue(facet: Facet | string, facetValue: Value | string, negate?: boolean): void {
		if (negate === undefined) {
			negate = false;
		}

		const facetName = typeof facet === 'string' ? facet : facet.Name;
		const facetField = typeof facet === 'string' ? facet : facet.selectionField;

		const valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
		const valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

		if (!valueValue) {
			console.error(`Facet ${facetName} (${facetField}) has no facet value for ${valueLabel}`);
			return;
		}

		let facetSelections = store.pendingSearch.FacetSelections;

		// handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
		// search request.
		if (facetField === 'searchWithin') {
			// set the search within to the facet value provided
			setSearchSelections(facetSelections, /* searchWithin */ valueValue);

			return;
		}

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

		setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
	}

	/**
	 * Entirely clears all the values of the given facet from the current selection.
	 * @param facet The facet to clear.
	 */
	function clearFacet(facet: Facet | string) {
		const facetField = typeof facet === 'string' ? facet : facet.selectionField;

		const facetSelections = store.pendingSearch.FacetSelections;

		// handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
		// search request.
		if (facetField === 'searchWithin') {
			// set searchWithin to undefined to clear it
			setSearchSelections(facetSelections, /* searchWithin */ undefined);

			return;
		}

		if (!facetSelections || !facetSelections[facetField]) {
			// if there are no facet selections or the facet isn't selected at all, there's nothing to clear
			return;
		}

		delete facetSelections[facetField];

		setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
	}

	/**
	 * Clears a given facet value of the given facet from the current selection.
	 * @param facet The facet to clear.
	 * @param facetValue The facet value to clear.
	 */
	function clearFacetValue(facet: Facet | string, facetValue: Value | string) {
		const facetName = typeof facet === 'string' ? facet : facet.Name;
		const facetField = typeof facet === 'string' ? facet : facet.selectionField;

		const valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
		const valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

		if (!valueValue) {
			console.error(`Facet ${facetName} (${facetField}) has no facet value for ${valueLabel}`);
			return;
		}

		// handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
		// search request.
		if (facetField === 'searchWithin') {
			// set searchWithin to undefined to clear it
			setSearchSelections(store.pendingSearch.FacetSelections, /* searchWithin */ undefined);

			return;
		}

		const { state: selState, selectionIndex } = store.isFacetSelected(facet, facetValue);

		if (selState === FacetSelectionState.NotSelected) {
			// if there are no facet selections or the facet isn't selected at all, there's nothing to clear
			return;
		}

		const facetSelections = store.pendingSearch.FacetSelections!;

		// remove it from the selections
		facetSelections[facetField]!.splice(selectionIndex!, 1);

		if (facetSelections[facetField]!.length === 0) {
			// clean up any facets that no longer have any selected facet values
			delete facetSelections[facetField];
		}

		setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
	}

	/**
	 * Clears all selected facets from the current selection.
	 */
	function clearAllFacets(): void {
		setSearchSelections(undefined, store.pendingSearch.SearchWithin);
	}

	const actor: SearchActor = {
		search,
		setSearch,
		toggleFacetValue,
		clearFacet,
		clearFacetValue,
		clearAllFacets,
	};

	return [store, actor];
}
