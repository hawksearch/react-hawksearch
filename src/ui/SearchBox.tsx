import React from 'react';
import { useHawkStore } from 'store/Store';

function SearchBox() {
	const { store, storeMutator } = useHawkStore();

	function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.keyCode === 13) {
			doSearch(event.currentTarget.value);
		}
	}

	function onBlur(event: React.FocusEvent<HTMLInputElement>) {
		doSearch(event.currentTarget.value);
	}

	function doSearch(keyword: string) {
		storeMutator.search(keyword);
	}

	return (
		<>
			<input type="text" onKeyUp={onKeyUp} onBlur={onBlur} style={{ width: '100%' }} />
		</>
	);
}

export default SearchBox;
