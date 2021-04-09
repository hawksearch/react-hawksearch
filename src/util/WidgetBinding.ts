const dataLayers = {}
const configurations = {}

export function updateBindedStores({ dataLayer, widgetId, store, actor, config }) {
	if (!dataLayers.hasOwnProperty(dataLayer)) {
		dataLayers[dataLayer] = {};
	}

	dataLayers[dataLayer][widgetId] = { store, actor };
	configurations[widgetId] = config;

	for (let [id, instance] of Object.entries(dataLayers[dataLayer])) {
		if (id != widgetId &&
			instance.actor &&
			!_.isEqual(instance.store.searchResults, store.searchResults) &&
			configurations[id].indexName == config.indexName) {
			instance.actor.setStore(store);
		}
	}
}