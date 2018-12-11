export interface HawkSearchConfig {
	/**
	 * API Client Guid. Usually comes from the "Tracking Key" in the "Account Info" section of the hawk dashboard.
	 */
	clientGuid: string;

	/**
	 * The url of the search page for this website. Users will be redirected to this page when performing a
	 * keyword search using the standalone search box.
	 *
	 * If not specified, will default to `/search`.
	 */
	searchPageUrl?: string;

	/**
	 * The amount of milliseconds that autocomplete suggestions should be debounced. This is the delay inbetween
	 * letter presses and autocomplete triggering.
	 */
	autocompleteDebounce?: number;
}
