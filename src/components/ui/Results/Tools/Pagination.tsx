import React from 'react';

import { useHawksearch } from 'components/StoreProvider';
import Pager from './Pager';
import ItemsPerPage from './ItemsPerPage';

function Pagination() {
	const {
		store: { searchResults, pendingSearch },
		actor,
	} = useHawksearch();

	function onPageChange(pageNo: number) {
		// when the pager's page changes, trigger a new search
		actor.setSearch({
			PageNo: pageNo,
		});
	}

	return (
		<div className="hawk-pagination">
			<Pager
				page={searchResults ? pendingSearch.PageNo || 1 : 0}
				totalPages={searchResults ? searchResults.Pagination.NofPages : 0}
				onPageChange={onPageChange}
			/>

			<ItemsPerPage />
		</div>
	);
}

export default Pagination;
