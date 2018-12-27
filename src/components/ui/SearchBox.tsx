import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBoxBase from 'components/SearchBoxBase';
import { Product } from 'models/Autocomplete';

function SearchBox() {
	const { store, actor } = useHawkSearch();

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		if (event.key === 'Enter') {
			actor.setSearch({
				Keyword: event.currentTarget.value,
			});
		}
	}

	return (
		<div>
			<SearchBoxBase
				initialValue={store && store.pendingSearch ? store.pendingSearch.Keyword : ''}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}

export default SearchBox;
