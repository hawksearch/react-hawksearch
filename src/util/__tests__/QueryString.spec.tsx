import { parseSearchQueryString, getSearchQueryString } from 'util/QueryString';
import { Request } from 'models/Search';

describe('QueryString Utils', () => {
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
		const queryString = 'color=black&brand=cool,kinda-cool&keyword=this is my keyword';

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
			Keyword: 'this is my keyword',
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});

	it('handles query params with no values', () => {
		// arrange
		const queryString = 'keyword=men&brand=';

		// act
		const obj = parseSearchQueryString(queryString);

		// assert
		expect(obj).toMatchSnapshot();
	});
});
