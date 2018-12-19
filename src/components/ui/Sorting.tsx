import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

function Sorting() {
	const { store, actor } = useHawkSearch();

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		actor.setSearch({
			SortBy: event.currentTarget.value,
		});
	}

	return (
		<select value={store.pendingSearch.SortBy} onChange={onChange}>
			<option value="score">Best Match</option>
			<option value="titleasc">Title (A-Z)</option>
		</select>
	);
}

export default Sorting;
