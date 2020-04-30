import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

function Sorting() {
	const {
		store: { searchResults, pendingSearch },
		actor,
	} = useHawkSearch();

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		actor.setSearch({
			SortBy: event.currentTarget.value,
		});
	}

	return (
		<div className="hawk-sorting">
			<span className="hawk-sorting__label">Sort By</span>

			<select value={pendingSearch.SortBy} onChange={onChange}>
				{searchResults ? (
					searchResults.Sorting.Items.map(sortingItem => (
						<option key={sortingItem.Value} value={sortingItem.Value} selected={sortingItem.Selected}>
							{sortingItem.Label}
						</option>
					))
				) : (
					<option value="score">Best Match</option>
				)}
			</select>
		</div>
	);
}

export default Sorting;
