import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

function SearchBox() {
	const { store, actor } = useHawkSearch();

	function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			doSearch(event.currentTarget.value);
		}
	}

	function doSearch(keyword: string) {
		actor.setSearch({
			Keyword: keyword,
		});
	}

	return (
		<>
			<input type="text" onKeyUp={onKeyUp} style={{ width: '100%' }} />
		</>
	);
}

export default SearchBox;
