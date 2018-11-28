import React, { useState, useContext } from 'react';

import { Result } from 'models';
import HawkClient from 'net/HawkClient';

class Store {
	public Items?: Result[];
}

export interface StoreMutator {
	search(keyword: string): Promise<void>;
}

function useHawkState(): [Store, StoreMutator] {
	const client = new HawkClient();

	const [results, setResults] = useState(new Store());

	async function search(keyword: string): Promise<void> {
		console.debug('Searching for', keyword);

		const searchResults = await client.search({
			ClientGuid: 'cf0025fa93fa458394abd3c3094a09ac',
			Keyword: keyword,
		});

		if (searchResults) {
			console.debug('Search results:', searchResults);

			setResults({ Items: searchResults.Results });
		}
	}

	return [
		results,
		{
			search,
		},
	];
}

interface HawkContextValue {
	store: Store;
	storeMutator: StoreMutator;
}

export const HawkContext = React.createContext({} as HawkContextValue);

export function HawkStoreProvider({ children }) {
	const [store, storeMutator] = useHawkState();

	return <HawkContext.Provider value={{ store, storeMutator }}>{children}</HawkContext.Provider>;
}

export function useHawkStore() {
	return useContext(HawkContext);
}

export default Store;
