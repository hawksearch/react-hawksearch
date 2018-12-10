import React, { useContext } from 'react';

import { SearchStore, SearchActor, useHawkState } from 'store/Store';
import { Request } from 'models/Search';

const HawkContext = React.createContext({} as HawkContextValue);

export interface HawkStoreProviderProps {
	initialSearch?: Partial<Request>;
	children: React.ReactNode;
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

/**
 * This component acts as the global store for the hawksearch application state. Only one instance of this component
 * should exist, and it should be the root level component.
 */
function StoreProvider({ initialSearch, children }: HawkStoreProviderProps) {
	const [store, actor] = useHawkState(initialSearch);

	return <HawkContext.Provider value={{ store, actor }}>{children}</HawkContext.Provider>;
}

/**
 * Retrieves the global hawk store for use within a component.
 */
export function useHawkSearch() {
	return useContext(HawkContext);
}

export default StoreProvider;
