import React, { useContext } from 'react';

import { SearchResult, Result, Facet } from 'models';
import HawkClient from 'net/HawkClient';
import { useMergableState } from 'util/MergableState';

class Store {
	public searchResults?: SearchResult;

	public isLoading: boolean;

	public items?: Result[];
	public facets?: Facet[];
}

export interface StoreMutator {
	/** Performs a search with the given keyword. */
	search(keyword: string): Promise<void>;
}

export function useHawkState(): [Store, StoreMutator] {
	const client = new HawkClient();

	const [state, setState] = useMergableState(new Store());

	async function search(keyword: string): Promise<void> {
		console.debug('Searching for: ', keyword);

		setState({ isLoading: true });

		const searchResults = await client.search({
			ClientGuid: 'cf0025fa93fa458394abd3c3094a09ac',
			Keyword: keyword,
		});

		setState({ isLoading: false });

		if (searchResults) {
			console.debug('Search results:', searchResults);

			setState({
				searchResults,
				items: searchResults.Results,
				facets: searchResults.Facets,
			});
		}
	}

	return [
		state,
		{
			search,
		},
	];
}

interface HawkContextValue {
	/** The store of data used throughout the application. */
	store: Store;
	/**
	 * An interface that allows actions to be performed on the store (such as executing searches,
	 * changing pages, etc).
	 */
	storeMutator: StoreMutator;
}

export const HawkContext = React.createContext({} as HawkContextValue);

/**
 * This component acts as the global store for the hawksearch application state. Only one instance of this component
 * should exist, and it should be the root level component.
 */
export function HawkStoreProvider({ children }) {
	const [store, storeMutator] = useHawkState();

	return <HawkContext.Provider value={{ store, storeMutator }}>{children}</HawkContext.Provider>;
}

/**
 * Retrieves the global hawk store for use within a component.
 */
export function useHawkStore() {
	return useContext(HawkContext);
}

export default Store;
