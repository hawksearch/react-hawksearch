import { FacetSelections, Request } from 'models/Search/Request';
import { SearchStore } from '../store/Store';

/** Represents parts of the browser query string that are fixed and are always single strings. */

enum DefaultParams {
	keyword = "keyword",
	sort = "sort",
	pg = "pg",
	lp = "lp",
	PageId = "PageId",
	lpurl = "lpurl",
	mpp = "mpp",
	searchWithin = "searchWithin",
	is100Coverage = "is100Coverage",
	indexName = "indexName",
	ignoreSpellcheck = "ignoreSpellcheck",
	language = "language"
}

type DefaultParsed = {
	[key in DefaultParams]?: string
}

/**
 * Represents the parts of the browser query string that are dynamic (the selected facets). Facets
 * can have multiple values, so the value of these is always an array of strings.
 */

interface Parsed {
	default: DefaultParsed;
	facet: FacetSelections;
};

const rangeFacets: string[] = [];

export function addToRangeFacets(facetName: string) {
	if (!rangeFacets.includes(facetName)) {
		rangeFacets.push(facetName);
	}
}

/**
 * Parses the input query string and returns an object that can be used to build a search request.
 * The object returned will usually have the keys: `keyword`, `sort`, `pg`,`lp`,`lpurl`, `mpp`, and then more keys
 * for every selected facet.
 * @param search The input query string.
 */
function parseQueryStringToObject(search: string) {
	const params = new URLSearchParams(urlStringToParamEntries(search));

	const defaul: DefaultParsed = {};
	const facet: FacetSelections = {};

	params.forEach((value, key) => {
		if (DefaultParams[key]) {
			// `keyword` is special and should never be turned into an array
			if (key === 'keyword') {
				defaul[key] = value;
			} else {
				defaul[key] = encodeURIComponent(value);
			}
		} else {
			// everything else should be turned into an array

			if (!value) {
				// no useful value for this query param, so skip it
				return;
			}

			// NOTE: Don't pass these values as facet selection
			if (['prv', 'hawkaid', 'token', 'refreshToken'].indexOf(key) !== -1) {
				return;
			}

			// multiple selections are split by commas, so split into an array
			const multipleValues = value.split(',');

			if(DefaultParams[key.split("-")[0]]) {
				facet[key.split("-")[0]] = multipleValues.map(i => decodeURIComponent(i).replace('::', ','));
			}
			else {
				facet[key] = multipleValues.map(i => decodeURIComponent(i).replace('::', ','));
			}
		}
	});

	return {
		defaul,
		facet
	};
}

/**
 * Parses the abosulte url into a `HawkClient` client search request object.
 * @param location The input location
 */
export function parseLocation(location: Location, searchUrl: string): Partial<Request> {
	const searchRequest = parseSearchQueryString(location.search);

	// customUrl have priority over keywords
	if (checkIfUrlRefsLandingPage(location.pathname, searchUrl)) {
		searchRequest.Keyword = undefined;
		const pathname = location.pathname;
		searchRequest.CustomUrl = pathname
			.split('/')
			.filter(path => path !== searchUrl && path !== '')
			.join('/');
		searchRequest.CustomUrl = searchRequest.CustomUrl ? '/' + searchRequest.CustomUrl : undefined;
	}
	return searchRequest;
}
/**
 * Parses the input query string into a `HawkClient` client search request object.
 * @param search The input query string.
 */
export function parseSearchQueryString(search: string): Partial<Request> {
	const { defaul, facet } = parseQueryStringToObject(search);

	// extract out components, including facet selections
	const {
		keyword,
		sort,
		pg,
		mpp,
		lp,
		PageId,
		lpurl,
		searchWithin,
		is100Coverage,
		indexName,
		ignoreSpellcheck,
	} = defaul;

	// ignore landing pages if keyword is passed
	const pageId = lp || PageId;
	return {
		Keyword: lpurl || pageId ? '' : keyword,
		SortBy: sort,
		PageNo: pg ? Number(pg) : undefined,
		MaxPerPage: mpp ? Number(mpp) : undefined,
		PageId: pageId ? Number(pageId) : undefined,
		CustomUrl: lpurl,
		SearchWithin: searchWithin,
		Is100CoverageTurnedOn: is100Coverage ? Boolean(is100Coverage) : undefined,
		FacetSelections: facet,
		IndexName: indexName,
		IgnoreSpellcheck: ignoreSpellcheck ? ignoreSpellcheck === 'true' : undefined,
	};
}

export function checkIfUrlRefsLandingPage(path: string, searchUrl: string): boolean {
	if (!path) {
		// if there's no path, this request can't be for a landing page
		return false;
	}

	if (!path.endsWith('/')) {
		path = path + '/';
	}

	if (!searchUrl.endsWith('/')) {
		searchUrl = searchUrl + '/';
	}

	return path !== searchUrl;
}

/**
 * Converts a search query object (such as one returned from `parseSearchQueryString`) and converts
 * it into a browser query string
 * @param queryObj The query object to convert to a query string.
 */
function convertObjectToQueryString(queryObj: Parsed) {
	const queryStringValues: string[] = [];

	for (const key in queryObj.default) {
		if (queryObj.default.hasOwnProperty(key)) {
			const value = queryObj.default[key];

			if (value === undefined || value === null) {
				// if any of the special keys just aren't defined or are null, don't include them in
				// the query string
				continue;
			}

			if (typeof key !== 'string') {
				throw new Error(`${key} must be a string`);
			}

			// certain strings are special and are never arrays
			if (key === 'keyword') {
				queryStringValues.push(key + '=' + value);
			} else {
				queryStringValues.push(key + '=' + encodeURIComponent(value));
			}
		}
	}

	for (const key in queryObj.facet) {
		if (queryObj.facet.hasOwnProperty(key)) {
			const values = queryObj.facet[key];
			if (values) {
				// handle comma escaping - if any of the values contains a comma, they need to be escaped first
				const escapedValues: string[] = [];

				for (let unescapedValue of values) {
					if (rangeFacets.includes(key)) {
						unescapedValue = unescapedValue.replace(',', '::');
					}

					escapedValues.push(encodeURIComponent(unescapedValue));
				}
				if(DefaultParams[key]) {
					queryStringValues.push(key + "-facet" + '=' + escapedValues.join(','));
				}
				else {
					queryStringValues.push(key + '=' + escapedValues.join(','));
				}
			}
		}
	}

	return '?' + queryStringValues.join('&');
}

/**
 * Converts a partial search request object into a browser query string.
 * @param searchRequest The search request object to convert.
 */
export function getSearchQueryString(searchRequest: Partial<Request>, store?: SearchStore) {
	const searchQuery = {
		default: {
			keyword: searchRequest.Keyword,
			sort: searchRequest.SortBy,
			pg: searchRequest.PageNo ? String(searchRequest.PageNo) : undefined,
			mpp: searchRequest.MaxPerPage ? String(searchRequest.MaxPerPage) : undefined,
			is100Coverage: searchRequest.Is100CoverageTurnedOn ? String(searchRequest.Is100CoverageTurnedOn) : undefined,
			searchWithin: searchRequest.SearchWithin,
			indexName: searchRequest.IndexName,
			language: searchRequest.Language,
			ignoreSpellcheck:
				!searchRequest.IgnoreSpellcheck || !searchRequest.IgnoreSpellcheck
					? undefined
					: String(searchRequest.IgnoreSpellcheck),
		},
		facet: {
			...searchRequest.FacetSelections
		}
	} as Parsed;

	return convertObjectToQueryString(searchQuery);
}

function urlStringToParamEntries(searchQuery: string) {
	if (searchQuery && typeof searchQuery === 'string' && searchQuery.length) {
		if (searchQuery[0] === '?') {
			searchQuery = searchQuery.slice(1);
		}

		return searchQuery.split('&').map(i => {
			const entries = i.split('=');

			if (entries.length === 2) {
				return entries;
			} else if (entries.length > 2) {
				return [entries[0], entries.slice(0, 1).join('')];
			} else {
				return [entries.join(''), ''];
			}
		});
	} else {
		return searchQuery;
	}
}
