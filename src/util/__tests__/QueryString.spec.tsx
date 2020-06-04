import { parseSearchQueryString, getSearchQueryString, checkIfUrlRefsLandingPage } from 'util/QueryString';
import { Request } from 'models/Search';

describe('parseSearchQueryString', () => {
	it('parses facets into arrays', () => {
		// arrange
		const queryString = 'color=black&brand=cool';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});

	it('parses facets into arrays and handles question mark', () => {
		// arrange
		const queryString = '?color=black&brand=cool';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});

	it('parses multiple facet values into arrays', () => {
		// arrange
		const queryString = 'color=black&brand=cool,kinda-cool';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});

	it('handles keyword when parsing', () => {
		// arrange
		const queryString = 'color=black&brand=cool,kinda-cool&keyword=this%20is%20my%20keyword';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});

	it('handles keyword when it has multiple values', () => {
		// arrange
		const queryString = 'keyword=this is my keyword,which should be a long string';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});

	it('handles query params with no values', () => {
		// arrange
		const queryString = 'keyword=men&brand=';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});

	it('parses search within', () => {
		// arrange
		const queryString = 'color=black&brand=cool&searchWithin=blah blah';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});
});

describe('getSearchQueryString', () => {
	it('turns arrays into query string', () => {
		// arrange
		const obj: Partial<Request> = {
			FacetSelections: {
				color: ['black'],
				brand: ['cool'],
			},
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});

	it('turns arrays with multiple values into query string', () => {
		// arrange
		const obj: Partial<Request> = {
			FacetSelections: {
				color: ['black'],
				brand: ['cool', 'kinda-cool'],
			},
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});

	it('turns arrays with multiple values into query string and handles keyword', () => {
		// arrange
		const obj: Partial<Request> = {
			FacetSelections: {
				color: ['black'],
				brand: ['cool', 'kinda-cool'],
			},
			Keyword: decodeURIComponent('this is my keyword'),
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});

	it('escapes commas', () => {
		// arrange
		const obj: Partial<Request> = {
			FacetSelections: {
				priceslider: ['123,456'],
			},
			Keyword: 'this is my keyword',
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});
});

describe('checkIfUrlRefsLandingPage', () => {
	it('matches exactly', () => {
		// arrange
		const path = '/search';
		const searchPage = '/search';

		// act
		const isLandingPage = checkIfUrlRefsLandingPage(path, searchPage);

		// assert
		expect(isLandingPage).toBe(false);
	});

	it('does not match for different paths', () => {
		// arrange
		const path = '/my-search-page';
		const searchPage = '/search';

		// act
		const isLandingPage = checkIfUrlRefsLandingPage(path, searchPage);

		// assert
		expect(isLandingPage).toBe(true);
	});

	it('does not match for subfolders', () => {
		// arrange
		const path = '/my-site/search';
		const searchPage = '/search';

		// act
		const isLandingPage = checkIfUrlRefsLandingPage(path, searchPage);

		// assert
		expect(isLandingPage).toBe(true);
	});

	it('matches without regard to slashes', () => {
		// arrange, act, assert
		expect(checkIfUrlRefsLandingPage('/search/', '/search')).toBe(false);
		expect(checkIfUrlRefsLandingPage('/search', '/search/')).toBe(false);
		expect(checkIfUrlRefsLandingPage('/search/', '/search/')).toBe(false);
		expect(checkIfUrlRefsLandingPage('/search', '/search')).toBe(false);
	});
});
