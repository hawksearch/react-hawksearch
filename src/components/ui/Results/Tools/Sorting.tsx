import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

function Sorting() {
	const {
		store: { isLoading, searchResults, pendingSearch },
		actor,
	} = useHawkSearch();

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		actor.setSearch({
			SortBy: event.currentTarget.value,
		});
	}

	if (!searchResults) {
		return null;
	}

	return (
		<div className="hawk-sorting">
			<span className="hawk-sorting__label">Sort By</span>

			<select value={pendingSearch.SortBy} onChange={onChange}>
				{searchResults &&
					searchResults.Sorting.Items.map(sortingItem => (
						<option key={sortingItem.Value} value={sortingItem.Value}>
							{sortingItem.Label}
						</option>
					))}
			</select>
		</div>
	);
}

export default Sorting;
