import React, { useState } from 'react';

import { LeftChevronSVG, RightChevronSVG } from 'components/svg';

interface PagerProps {
	page: number;
	totalPages: number;

	onPageChange: (page: number) => void;
}

function Pager({ page, totalPages, onPageChange }: PagerProps) {
	const [inputValue, setInputValue] = useState<string | undefined>(undefined);
	const [hasError, setHasError] = useState(false);

	function goToPreviousPage() {
		goToPage(page - 1);
	}

	function goToNextPage() {
		goToPage(page + 1);
	}

	function goToPage(pageNo: number) {
		if (isNaN(pageNo)) {
			// not a valid number
			doInputError();
			return;
		}

		if (pageNo < 1) {
			// can't go beyond the first page
			doInputError();
			return;
		}

		if (pageNo > totalPages) {
			// can't go beyond the last page
			doInputError();
			return;
		}

		// once we've determined that we *do* want to do this page change, clear the user's input
		// because the input should be driven by props again
		setInputValue(undefined);

		// inform the consumer that we've changed pages
		onPageChange(pageNo);
	}

	/**
	 * Returns the input value for the pager input control. If the user has typed in a value into the input then
	 * that value will be returned; otherwise, the page value passed in via props will be returned.
	 */
	function getInputValue() {
		if (inputValue !== undefined) {
			// if the user typed an input, that's the page value for the control
			return inputValue || '';
		}

		// otherwise, fall back to what's passed in through props
		return page;
	}

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		const wantedPageNo = parseInt(event.currentTarget.value, 10);

		if (event.key === 'Enter') {
			goToPage(wantedPageNo);
		}
	}

	function onBlur(event: React.FocusEvent<HTMLInputElement>) {
		if (Number(event.currentTarget.value) !== page) {
			const wantedPageNo = parseInt(event.currentTarget.value, 10);
			goToPage(wantedPageNo);
		}
	}

	function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		const keyCode = event.keyCode || event.which;
		const keyValue = String.fromCharCode(keyCode);
		if (keyValue.match(/[+-.e]+/g)) {
			event.preventDefault();
		}
	}

	function onInput(event: React.KeyboardEvent<HTMLInputElement>) {
		let wantedPageNo = parseInt(event.currentTarget.value, 10);

		if (wantedPageNo > totalPages) {
			wantedPageNo = totalPages;
			event.currentTarget.value = '';
			event.preventDefault();
		}

		if (wantedPageNo < 1) {
			wantedPageNo = 1;
			event.currentTarget.value = '';
			event.preventDefault();
		}
	}

	function doInputError() {
		setHasError(true);

		// in 500ms, clear the error animation
		setTimeout(() => {
			setHasError(false);
		}, 500);
	}

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.currentTarget.value);
	}

	return (
		<div className="hawk-pagination__controls">
			<button className="hawk-pagination__item" onClick={goToPreviousPage}>
				<LeftChevronSVG class="hawk-pagination__left" />
				<span className="visually-hidden">Previous page</span>
			</button>
			<input
				type="number"
				value={getInputValue()}
				onChange={onChange}
				onInput={onInput}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				onBlur={onBlur}
				min="1"
				max={totalPages}
				className={hasError ? 'hawk-pagination__input error' : 'hawk-pagination__input'}
			/>
			<span className="hawk-pagination__total-text">&nbsp; of {totalPages}</span>
			<button className="hawk-pagination__item" onClick={goToNextPage}>
				<RightChevronSVG class="hawk-pagination__right" />
				<span className="visually-hidden">Next page</span>
			</button>
		</div>
	);
}

export default Pager;
