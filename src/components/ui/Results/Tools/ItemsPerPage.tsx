import React from 'react';

import { useHawksearch } from 'components/StoreProvider';

function ItemsPerPage() {
	const {
		store: { searchResults, pendingSearch },
		actor,
	} = useHawksearch();

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		actor.setSearch({
			MaxPerPage: Number(event.currentTarget.value),
			PageNo: 1, // if we change our max items per page, reset to page 1
		});
	}

	return (
		<div className="hawk-items-per-page">
			<select value={pendingSearch.MaxPerPage} onChange={onChange}>
				{searchResults ? (
					searchResults.Pagination.Items.map(paginationItem => (
						<option key={paginationItem.PageSize} value={paginationItem.PageSize}>
							{paginationItem.Label}
						</option>
					))
				) : (
					<option>12 Items Per Page</option>
				)}
			</select>
		</div>
	);
}

export default ItemsPerPage;
