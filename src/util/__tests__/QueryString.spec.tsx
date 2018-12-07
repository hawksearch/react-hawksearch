import { parseSearchQueryString, getSearchQueryString } from 'util/QueryString';

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
		const obj = {
			color: ['black'],
			brand: ['cool'],
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});

	it('turns arrays with multiple values into query string', () => {
		// arrange
		const obj = {
			color: ['black'],
			brand: ['cool', 'kinda-cool'],
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});

	it('turns arrays with multiple values into query string and handles keyword', () => {
		// arrange
		const obj = {
			color: ['black'],
			brand: ['cool', 'kinda-cool'],
			keyword: 'this is my keyword',
		};

		// act
		const queryString = getSearchQueryString(obj);

		// assert
		expect(queryString).toMatchSnapshot();
	});

	it('throws when keyword is not a string', () => {
		// arrange
		const obj = {
			color: ['black'],
			brand: ['cool', 'kinda-cool'],
			keyword: ['this is my keyword'],
		};

		// act & assert
		expect(() => {
			getSearchQueryString(obj);
		}).toThrowError();
	});
});
