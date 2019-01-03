import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import Pager from './Pager';
import ItemsPerPage from './ItemsPerPage';

function Pagination() {
	const {
		store: { searchResults, pendingSearch },
		actor,
	} = useHawkSearch();

	if (!searchResults || searchResults.Pagination.NofPages === 1) {
		// TODO: this should still render if there's 1 page
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
