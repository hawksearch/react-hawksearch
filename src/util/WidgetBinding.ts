import { isEqual } from 'lodash';

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

	dataLayers[dataLayer][widgetId] = { store, actor };
	configurations[widgetId] = config;

	for (const [id, instance] of Object.entries(dataLayers[dataLayer])) {
		if (
			id !== widgetId &&
			instance.actor &&
			!isEqual(instance.store.searchResults, store.searchResults) &&
			configurations[id].indexName === config.indexName
		) {
			instance.actor.setStore(store);
		}
	}
}
