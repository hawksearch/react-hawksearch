import { Request } from 'models/Search/Request';

/** Represents parts of the browser query string that are fixed and are always single strings. */
interface ParsedQueryStringFixed {
	keyword?: string;
	sort?: string;
	pg?: string;
	mpp?: string;
	searchWithin?: string;
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
 * The object returned will usually have the keys: `keyword`, `sort`, `pg`, `mpp`, and then more keys
 * for every selected facet.
 * @param search The input query string.
 */
function parseQueryStringToObject(search: string) {
	const params = new URLSearchParams(search);

	const parsed: ParsedQueryString = {};

	params.forEach((value, key) => {
		if (key === 'keyword' || key === 'sort' || key === 'pg' || key === 'mpp' || key === 'searchWithin') {
			// `keyword` is special and should never be turned into an array
			parsed[key] = value;
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
 * Parses the input query string into a `HawkClient` client search request object.
 * @param search The input query string.
 */
export function parseSearchQueryString(search: string): Partial<Request> {
	const queryObj = parseQueryStringToObject(search);

	// extract out components, including facet selections
	const { keyword, sort, pg, mpp, searchWithin, ...facetSelections } = queryObj;

	return {
		Keyword: keyword,

		SortBy: sort,
		PageNo: pg ? Number(pg) : undefined,
		MaxPerPage: mpp ? Number(mpp) : undefined,

		SearchWithin: searchWithin,

		FacetSelections: facetSelections,
	};
}

/**
 * Converts a search query object (such as one returned from `parseSearchQueryString`) and converts
 * it into a browser query string
 * @param queryObj The query object to convert to a query string.
 */
function convertObjectToQueryString(queryObj: ParsedQueryString) {
	const values: string[] = [];

	for (const key in queryObj) {
		if (queryObj.hasOwnProperty(key)) {
			const value = queryObj[key];

			if (key === 'keyword' || key === 'sort' || key === 'pg' || key === 'mpp' || key === 'searchWithin') {
				if (value === undefined || value === null) {
					// if any of the special keys just aren't defined or are null, don't include them in
					// the query string
					continue;
				}

				if (typeof value !== 'string') {
					throw new Error(`${key} must be a string`);
				}

				// certain strings are special and are never arrays
				values.push(key + '=' + value);
			} else {
				const multipleValues = value;

				// handle comma escaping - if any of the values contains a comma, they need to be escaped first
				for (let x = 0; x < multipleValues.length; ++x) {
					multipleValues[x] = multipleValues[x].replace(',', '::');
				}
				values.push(key + '=' + multipleValues.join(','));
			}
		}
	}

	return '?' + values.join('&');
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

		searchWithin: searchRequest.SearchWithin,

		...searchRequest.FacetSelections,
	} as ParsedQueryString;

	return convertObjectToQueryString(searchQuery);
}
