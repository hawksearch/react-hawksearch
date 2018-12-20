import React from 'react';
import { useHawkSearch } from 'components/StoreProvider';
import { LeftChevronSVG, RightChevronSVG } from 'components/svg';

function Pagination() {
	const {
		store: { searchResults, pendingSearch },
		store,
		actor,
	} = useHawkSearch();

	function goToPreviousPage() {
		goToPage(getCurrentPage() - 1);
	}

	function goToNextPage() {
		goToPage(getCurrentPage() + 1);
	}

	function goToPage(pageNo: number) {
		console.debug('Going to page', pageNo);
		actor.setSearch({
			PageNo: pageNo,
		});
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
			<input type="number" value={pendingSearch.PageNo || searchResults.Pagination.CurrentPage} />
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
