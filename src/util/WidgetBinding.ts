import { HawkContextValue } from './../components/StoreProvider';
/**
 * Object containing all initialized stores
 */
const dataLayers = {};

/**
 * All initialized configurations
 * Used for index name verification
 */
const configurations = {};

/**
 * A method invoked at store updates that propagates the data between similar stores
 * Store matching is based on the unique identifier and the configuration index name
 */
export function updateBindedStores({ dataLayer, widgetId, store, actor, config }) {
	if (!dataLayers.hasOwnProperty(dataLayer)) {
		dataLayers[dataLayer] = {};
	}

	const _ = require('lodash');

	dataLayers[dataLayer][widgetId] = { store, actor };
	configurations[widgetId] = config;

	for (const [id, instance] of Object.entries(dataLayers[dataLayer])) {
		if (
			id !== widgetId &&
			(instance as HawkContextValue).actor &&
			!_.isEqual((instance as HawkContextValue).store.searchResults, store.searchResults) &&
			configurations[id].indexName === config.indexName
		) {
			(instance as HawkContextValue).actor.setStore(store);
		}
	}
}
