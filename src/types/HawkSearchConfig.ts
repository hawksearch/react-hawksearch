import { FacetComponent } from 'types/FacetComponent';
import { SuggestionStrategyMatch } from 'models/Autocomplete/Suggestion';

export interface HawksearchConfig {
	/**
	 * Optional URL of the Hawksearch API that will be used for all search and autocomplete requests. This can also
	 * be the URL of a proxy server that can act as a trusted middleware between the React frontend components and the
	 * search API.
	 *
	 * If not specified, this will default to `https://searchapi-dev.hawksearch.net`.
	 */
	apiUrl?: string;

	/**
	 * Optional URL of the Hawksearch Dashboard, that is used eg. as baseUrl for assets.
	 *
	 * If not specified, this will default to `http://test.hawksearch.net/`.
	 */
	dashboardUrl?: string;
	/**
	 * Relative URL of the endpoint call for getting results. It will use `/api/search` if not provided.
	 */

	searchUrl?: string;

	/**
	 * Relative URL of the endpoint call to track events.
	 */

	trackEventUrl?: string;

	/**
	 * Relative URL of the endpoint call for autocomplete. It will use `/api/autocomplete` if not provided.
	 */
	autocompleteUrl?: string;

	/**
	 * Id of the DOM element that the search application (facets, search results) should be rendered into.
	 * This value is required when rendering the search application, and is optional if only rendering the
	 * search textbox.
	 *
	 * This value is only required when using the minified version of the library.
	 */
	searchElement?: HTMLElement | string;

	/**
	 * Id of the DOM element that the search textbox should be rendered into. If not specified, the search textbox
	 * will be rendered into the element specified by @see searchElement.
	 *
	 * This value is only used when using the minified version of the library.
	 */
	searchBoxElement?: HTMLElement | string;

	/**
	 * The public url that assets (auxilary JS files, CSS, etc) required for the library will be loaded from. This is
	 * only required when using the minified version of the library. By default this path is `"/assets/"`, so vendor JS
	 * will load from `//my.website.com/assets/auxilary-js-file.js`.
	 */
	assetPath?: string;

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
	 * letter presses and autocomplete triggering. If not specified, will default to 200.
	 */
	autocompleteDebounce?: number;

	/**
	 * The definition of custom autocomplete strategies that overrides default ones
	 */
	autocompleteStrategies?: SuggestionStrategyMatch[];

	/**
	 * The definition of custom components that overrides default ones in facets rail panel
	 */
	facetOverrides?: FacetComponent[];
	/**
	 * Additional flag that if set will request extended results data
	 */
	isInPreview?: boolean;
	/**
	 * IndexName if set will enable a query to a specific index in the search API
	 */
	indexName?: string;
	/**
	 * IndexName if set will enable a query to a specific index in the search API
	 */
	indexNameRequired?: boolean | false;

	/* *It will generate new token for expired token
	 */
	refreshTokenURL?: string;

	/**
	 * URL to update pin item. If not provided default will be /api/pinning/set-pinning/
	 */
	pinItemURL?: string;

	/**
	 * URL to update the sorting of pinned items. If not provided default will be /api/pinning/update-pin-order/
	 */
	updatePinOrderURL?: string;
	/*
	 * It will compare the properties of two or more items
	 */
	compareItemsURL?: string;

	/**
	 * Get product details. If not provided default will be api/internal-preview/item-detail
	 */
	productDetailsURL?: string;
}
