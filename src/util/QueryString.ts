import { Request } from 'models/Search/Request';

/** Represents parts of the browser query string that are fixed and are always single strings. */
interface ParsedQueryStringFixed {
	keyword?: string;
	sort?: string;
	pg?: string;
	lp?: string;
	PageId?: string;
	lpurl?: string;
	mpp?: string;
	searchWithin?: string;
	is100Coverage?: string;
	indexName?: string;
	ignoreSpellcheck?: string;
}

/**
 * Represents the parts of the browser query string that are dynamic (the selected facets). Facets
 * can have multiple values, so the value of these is always an array of strings.
 */
interface ParsedQueryStringDynamic {
	[key: string]: string[];
}

type ParsedQueryString = ParsedQueryStringFixed & ParsedQueryStringDynamic;

/**
 * Parses the input query string and returns an object that can be used to build a search request.
 * The object returned will usually have the keys: `keyword`, `sort`, `pg`,`lp`,`lpurl`, `mpp`, and then more keys
 * for every selected facet.
 * @param search The input query string.
 */
function parseQueryStringToObject(search: string) {
	const params = new URLSearchParams(search);

	const parsed: ParsedQueryString = {};

	params.forEach((value, key) => {
		if (
			key === 'keyword' ||
			key === 'sort' ||
			key === 'pg' ||
			key === 'lp' ||
			key === 'PageId' ||
			key === 'lpurl' ||
			key === 'mpp' ||
			key === 'searchWithin' ||
			key === 'is100Coverage' ||
			key === 'indexName' ||
			key === 'ignoreSpellcheck'
		) {
			// `keyword` is special and should never be turned into an array
			parsed[key] = encodeURIComponent(value);
		} else {
			// everything else should be turned into an array

			if (!value) {
				// no useful value for this query param, so skip it
				return;
			}

			// multiple selections are split by commas, so split into an array
			const multipleValues = value.split(',');

			// and now handle any comma escaping - any single value that contained a comma is escaped to '::'
			for (let x = 0; x < multipleValues.length; ++x) {
				multipleValues[x] = multipleValues[x].replace('::', ',');
			}

			parsed[key] = multipleValues;
		}
	});

	return parsed;
}

/**
 * Parses the abosulte url into a `HawkClient` client search request object.
 * @param location The input location
 */
export function parseLocation(location: Location, searchUrl: string = '/search'): Partial<Request> {
	const searchRequest = parseSearchQueryString(location.search);

	// customUrl have priority over keywords
	if (checkIfUrlRefsLandingPage(location.pathname, searchUrl)) {
		searchRequest.Keyword = undefined;
		searchRequest.CustomUrl = location.pathname.replace(searchUrl, '');
	}
	return searchRequest;
}
/**
 * Parses the input query string into a `HawkClient` client search request object.
 * @param search The input query string.
 */
export function parseSearchQueryString(search: string): Partial<Request> {
	const queryObj = parseQueryStringToObject(search);

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
		...facetSelections
	} = queryObj;

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
		FacetSelections: facetSelections,
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
function convertObjectToQueryString(queryObj: ParsedQueryString) {
	const queryStringValues: string[] = [];

	for (const key in queryObj) {
		if (queryObj.hasOwnProperty(key)) {
			if (
				key === 'keyword' ||
				key === 'sort' ||
				key === 'pg' ||
				key === 'mpp' ||
				key === 'searchWithin' ||
				key === 'is100Coverage' ||
				key === 'indexName' ||
				key === 'ignoreSpellcheck'
			) {
				const value = queryObj[key];

				if (value === undefined || value === null) {
					// if any of the special keys just aren't defined or are null, don't include them in
					// the query string
					continue;
				}

				if (typeof value !== 'string') {
					throw new Error(`${key} must be a string`);
				}

				// certain strings are special and are never arrays
				queryStringValues.push(key + '=' + value);
			} else {
				const values = queryObj[key];

				// handle comma escaping - if any of the values contains a comma, they need to be escaped first
				const escapedValues: string[] = [];

				for (const unescapedValue of values) {
					escapedValues.push(unescapedValue.replace(',', '::'));
				}

				queryStringValues.push(key + '=' + escapedValues.join(','));
			}
		}
	}

	return '?' + queryStringValues.join('&');
}

/**
 * Converts a partial search request object into a browser query string.
 * @param searchRequest The search request object to convert.
 */
export function getSearchQueryString(searchRequest: Partial<Request>) {
	const searchQuery = {
		keyword: searchRequest.Keyword,

		sort: searchRequest.SortBy,
		pg: searchRequest.PageNo ? String(searchRequest.PageNo) : undefined,
		mpp: searchRequest.MaxPerPage ? String(searchRequest.MaxPerPage) : undefined,
		is100Coverage: searchRequest.Is100CoverageTurnedOn ? String(searchRequest.Is100CoverageTurnedOn) : undefined,
		searchWithin: searchRequest.SearchWithin,
		indexName: searchRequest.IndexName,
		ignoreSpellcheck:
			!searchRequest.IgnoreSpellcheck || !searchRequest.IgnoreSpellcheck
				? undefined
				: String(searchRequest.IgnoreSpellcheck),
		...searchRequest.FacetSelections,
	} as ParsedQueryString;

	return convertObjectToQueryString(searchQuery);
}
