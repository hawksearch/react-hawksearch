import { FacetType } from 'models/Facets/FacetType';

export const getVisitorExpiry = () => {
	const d = new Date();
	// 1 year
	d.setTime(d.getTime() + 360 * 24 * 60 * 60 * 1000);
	return d.toUTCString();
};

export const getVisitExpiry = () => {
	const d = new Date();
	// 4 hours
	d.setTime(d.getTime() + 4 * 60 * 60 * 1000);
	return d.toUTCString();
};

export const createGuid = () => {
	const s: any[] = [];
	const hexDigits = '0123456789abcdef';
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
	// tslint:disable-next-line: no-bitwise
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = '-';

	const uuid = s.join('');
	return uuid;
};

export const createWidgetId = () => {
	const s: any[] = [];
	const hexDigits = '0123456789abcdef';

	for (let i = 0; i < 16; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}

	const uuid = s.join('');
	return uuid;
};

export const getCookie = name => {
	const nameEQ = name + '=';
	const ca = document.cookie.split(';');
	// tslint:disable-next-line: prefer-for-of
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
};

export const setCookie = (name, value, expiry) => {
	let expires;
	if (expiry) {
		expires = '; expires=' + expiry;
	} else {
		expires = '';
	}
	document.cookie = name + '=' + value + expires + '; path=/';
};

function getRecentFacetExpiry() {
	const d = new Date();
	// 12 hours
	d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
	return d.toUTCString();
}

export const getParsedObject = (facetC, env, clientGUID) => {
	if (!facetC) {
		return {};
	}
	const dict = JSON.parse(facetC || '{}');
	return dict[env][clientGUID];
};

function getStringifyObject(obj) {
	let str = '';
	Object.keys(obj).forEach((element, index) => {
		if (index !== 0) {
			str += ',';
		}
		str += element + '|' + obj[element];
	});
	return str;
}

export const getEnvironment = url => {
	let environment = '';
	if (url.indexOf('dev') !== -1) {
		environment = 'dev';
	} else if (url.indexOf('test') !== -1) {
		environment = 'test';
	} else {
		environment = 'prod';
	}
	return environment;
};

export const setRecentSearch = (val, clientGuid, url) => {
	const env = getEnvironment(url || '');
	const cookie = getCookie(FacetType.RecentSearches);
	let dict = JSON.parse(cookie || '{}');

	// NOTE: If cookie is null
	if (!cookie) {
		const obj = {
			[env]: {
				[clientGuid]: {
					[val]: 1,
				},
			},
		};
		setCookie(FacetType.RecentSearches, JSON.stringify(obj), getRecentFacetExpiry());
		return;
	}
	// NOTE: If env doesn't exist
	if (!dict[env]) {
		const obj = {
			...dict,
			[env]: {
				[clientGuid]: {
					[val]: 1,
				},
			},
		};
		setCookie(FacetType.RecentSearches, JSON.stringify(obj), getRecentFacetExpiry());
		return;
	}
	// NOTE: If client guid doesn't exist
	if (!dict[env][clientGuid]) {
		const obj = {
			...dict,
			[env]: {
				...dict[env],
				[clientGuid]: {
					[val]: 1,
				},
			},
		};
		setCookie(FacetType.RecentSearches, JSON.stringify(obj), getRecentFacetExpiry());
		return;
	}
	dict = {
		...dict,
		[env]: {
			...dict[env],
			[clientGuid]: {
				...dict[env][clientGuid],
				[val]: dict[env][clientGuid][val] ? Number(dict[env][clientGuid][val] + 1) : 1,
			},
		},
	};
	setCookie(FacetType.RecentSearches, JSON.stringify(dict), getRecentFacetExpiry());
};

export const deleteCookie = name => {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
