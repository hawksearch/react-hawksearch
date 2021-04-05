import React, { useContext } from 'react';

import { createContext } from 'store/ContextInstance';
import { SearchStore } from 'store/Store';
import { useHawkState, SearchActor } from 'store/Hawkstate';
import { Request } from 'models/Search';

let HawkContext;

export interface HawkContextValue {
	/** The store of data used throughout the application. */
	store: SearchStore;
	/**
	 * An interface that allows actions to be performed on the store (such as executing searches,
	 * changing pages, etc).
	 */
	actor: SearchActor;
}

export interface HawkStoreProviderProps {
	/** The initial search to perform when initializing the search components. */
	initialSearch?: Partial<Request>;
	children: React.ReactNode;
	widgetBinding: string;
}

/**
 * This component acts as the global store for the hawksearch application state. Only one instance of this component
 * should exist, and it should be the root level component.
 */
function StoreProvider({ initialSearch, children }: HawkStoreProviderProps) {
	const [store, actor] = useHawkState(initialSearch);

	HawkContext = createContext('HawkContext_1', {} as HawkContextValue);

	return <HawkContext.Provider value={{ store, actor }}>{children}</HawkContext.Provider>;
}

/**
 * Retrieves the global hawk store for use within a component.
 */
export function useHawksearch() {
	return useContext(HawkContext);
}

export default StoreProvider;
