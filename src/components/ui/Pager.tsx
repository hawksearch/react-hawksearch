import React from 'react';

import { LeftChevronSVG, RightChevronSVG } from 'components/svg';

interface PagerProps {
	page: number;
	totalPages: number;

	onPageChange: (page: number) => void;
}

function Pager({ page, totalPages, onPageChange }: PagerProps) {
	function goToPreviousPage() {
		goToPage(page - 1);
	}

	function goToNextPage() {
		goToPage(page + 1);
	}

	function goToPage(pageNo: number) {
		if (pageNo < 1) {
			// can't go beyond the first page
			return;
		}

		if (pageNo > totalPages) {
			// can't go beyond the last page
			return;
		}

		onPageChange(pageNo);
	}

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			goToPage(Number(event.currentTarget.value));
		}
	}

	return (
		<div className="listing-pagination">
			<button className="listing-pagination__item" onClick={goToPreviousPage}>
				<LeftChevronSVG class="listing-pagination__left" />
				<span className="visually-hidden">Previous page</span>
			</button>
			<input type="number" value={page} />
			&nbsp; of {totalPages}
			&nbsp;
			<button className="listing-pagination__item" onClick={goToNextPage}>
				<RightChevronSVG class="listing-pagination__right" />
				<span className="visually-hidden">Next page</span>
			</button>
		</div>
	);
}

export default Pager;
