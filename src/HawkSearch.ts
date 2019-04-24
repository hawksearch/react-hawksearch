import { FacetComponent } from 'types/FacetComponent';

export interface HawkSearchConfig {
	/**
	 * Optional API base url that allow users to use proxy server as a middleware between FE app and Hawk Search API.
	 * It will use default Elastic Search API url if not set.
	 */
	apiUrl?: string;

	/**
	 * Relative URL of the endpoint call for getting results. It will use '/api/search' if not provided
	 */
	searchUrl?: string;

	/**
	 * Relative URL of the endpoint call for autocomplete. It will use '/api/autocomplete' if not provided
	 */

	autocompleteUrl?: string;
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

	/**
	 * The definition of custom components that overrides default ones in facets rail panel
	 */
	facetOverrides?: FacetComponent[];
}
