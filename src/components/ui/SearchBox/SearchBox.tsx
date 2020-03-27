import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBoxBase from 'components/ui/SearchBox/SearchBoxBase';
import { Product } from 'models/Autocomplete';

/**
 * This component is the search input box (with autosuggest) that should be utilized on search pages. For a simple
 * search input box that is meant to be used on non-search pages (or globally), see `GlobalSearchBox`.
 */
function SearchBox() {
	const { store, actor } = useHawkSearch();

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		if (event.key === 'Enter') {
			actor.setSearch({
				PageId: undefined,
				SearchWithin: event.currentTarget.value,
			});
		}
	}

	return (
		<div className="hawk__searchBox">
			<SearchBoxBase
				initialValue={store && store.pendingSearch ? store.pendingSearch.SearchWithin : ''}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}

export default SearchBox;
