export function parseSearchQueryString(search: string): any {
	const params = new URLSearchParams(search);

	const parsed = {};

	params.forEach((value, key) => {
		if (key === 'keyword') {
			// `keyword` is special and should never be turned into an array
			parsed[key] = value;
		} else {
			// everything else should be turned into an array
			parsed[key] = value.split(',');
		}
	});

	return parsed;
}

export function getSearchQueryString(query: any) {
	const values: string[] = [];

	for (const key in query) {
		if (query.hasOwnProperty(key)) {
			let value = query[key];

			if (key !== 'keyword') {
				value = value.join(',');
			}

			// `keyword` is special and is never an array

			values.push(key + '=' + value);
		}
	}

	return '?' + values.join('&');
}
