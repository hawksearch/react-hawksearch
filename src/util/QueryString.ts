export function parseSearchQueryString(search: string): any {
	const params = new URLSearchParams(search);

	const parsed = {};

	params.forEach((value, key) => {
		if (key === 'keyword' || key === 'sort' || key === 'pg' || key === 'mpp') {
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

			if (key === 'keyword' || key === 'sort' || key === 'pg' || key === 'mpp') {
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
				values.push(key + '=' + value.join(','));
			}
		}
	}

	return '?' + values.join('&');
}
