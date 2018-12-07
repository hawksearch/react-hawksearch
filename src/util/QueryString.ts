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
			const value = query[key];

			if (key !== 'keyword') {
				values.push(key + '=' + value.join(','));
			} else {
				if (typeof value !== 'string') {
					throw new Error('keyword must be a string');
				}

				// `keyword` is special and is never an array

				values.push(key + '=' + value);
			}
		}
	}

	return '?' + values.join('&');
}
