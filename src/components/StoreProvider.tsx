import React, { useContext, useEffect } from 'react';

import { SearchStore } from 'store/Store';
import { useHawkState, SearchActor } from 'store/Hawkstate';
import { Request } from 'models/Search';
import { useHawkConfig } from './ConfigProvider';
import { updateBindedStores } from 'util/WidgetBinding';

const HawkContext = React.createContext({} as HawkContextValue);

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
	widgetId?: String;
}

/**
 * This component acts as the global store for the hawksearch application state. Only one instance of this component
 * should exist, and it should be the root level component.
 */
function StoreProvider({ initialSearch, children, widgetId }: HawkStoreProviderProps) {
	const [store, actor] = useHawkState(initialSearch);
	const { config } = useHawkConfig();
	const dataLayer = config.dataLayer;

	useEffect(() => {
		if (dataLayer) {
			updateBindedStores({ dataLayer, widgetId, store, actor, config });
		}
	}, [store.searchResults])

	return <HawkContext.Provider value={{ store, actor }}>{children}</HawkContext.Provider>;
}

/**
 * Retrieves the global hawk store for use within a component.
 */
export function useHawksearch() {
	return useContext(HawkContext);
}

export default StoreProvider;
