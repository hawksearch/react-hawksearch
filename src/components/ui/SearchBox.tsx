import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBoxBase from 'components/SearchBoxBase';
import { Product } from 'models/Autocomplete';

function SearchBox() {
	const { actor } = useHawkSearch();

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		if (event.key === 'Enter') {
			actor.setSearch({
				Keyword: event.currentTarget.value,
			});
		}
	}

	return <SearchBoxBase onSubmit={handleSubmit} />;
}

export default SearchBox;
