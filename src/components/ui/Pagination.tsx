import React, { useState } from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { LeftChevronSVG, RightChevronSVG } from 'components/svg';

function Pagination() {
	const {
		store: { searchResults, pendingSearch },
		store,
		actor,
	} = useHawkSearch();

	const [page, setPage] = useState(String(getCurrentPage()));

	function goToPreviousPage() {
		goToPage(getCurrentPage() - 1);
	}

	function goToNextPage() {
		goToPage(getCurrentPage() + 1);
	}

	function goToPage(pageNo: number) {
		if (pageNo < 1) {
			// can't go beyond the first page
			return;
		}

		if (searchResults && pageNo > searchResults.Pagination.NofPages) {
			// can't go beyond the last page
			return;
		}

		// set our local page number
		setPage(String(pageNo));

		// and also trigger a search for this page
		actor.setSearch({
			PageNo: pageNo,
		});
	}

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			goToPage(Number(event.currentTarget.value));
		}
	}

	function getCurrentPage() {
		if (pendingSearch.PageNo) {
			// if the client has selected a specific page number, that's our current page number
			return pendingSearch.PageNo;
		}

		if (searchResults) {
			// if we have search results, fall back to the page number the server specified
			return searchResults.Pagination.CurrentPage;
		}

		return 1;
	}

	if (store.isInitialLoad) {
		// render nothing on the initial load
		return null;
	}

	if (!searchResults || !searchResults.Pagination) {
		// don't render if we haven't received pagination data yet
		return null;
	}

	return (
		<div className="listing-pagination">
			<button className="listing-pagination__item" onClick={goToPreviousPage}>
				<LeftChevronSVG class="listing-pagination__left" />
				<span className="visually-hidden">Previous page</span>
			</button>
			<input
				type="number"
				value={page}
				onKeyDown={onKeyDown}
				onChange={e => {
					setPage(e.currentTarget.value);
				}}
			/>
			&nbsp; of {searchResults.Pagination.NofPages}
			&nbsp;
			<button className="listing-pagination__item" onClick={goToNextPage}>
				<RightChevronSVG class="listing-pagination__right" />
				<span className="visually-hidden">Next page</span>
			</button>
		</div>
	);
}

export default Pagination;
