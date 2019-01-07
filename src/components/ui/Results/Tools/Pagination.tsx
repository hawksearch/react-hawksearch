import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import Pager from './Pager';
import ItemsPerPage from './ItemsPerPage';

function Pagination() {
	const {
		store: { searchResults, pendingSearch },
		actor,
	} = useHawkSearch();

	if (!searchResults) {
		return null;
	}

	function onPageChange(pageNo: number) {
		// when the pager's page changes, trigger a new search
		actor.setSearch({
			PageNo: pageNo,
		});
	}

	return (
		<div className="hawk-pagination">
			<Pager
				page={pendingSearch.PageNo || 1}
				totalPages={searchResults.Pagination.NofPages}
				onPageChange={onPageChange}
			/>

			<ItemsPerPage />
		</div>
	);
}

export default Pagination;
