import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkSearch } from 'components/StoreProvider';
import SearchBoxBase from 'components/ui/SearchBox/SearchBoxBase';
import { Product } from 'models/Autocomplete';
import SearchSuggestionsList, { SearchSuggestionsListProps } from './SearchSuggestionsList';

/**
 * This component is the search input box (with autosuggest) that should be utilized on search pages. For a simple
 * search input box that is meant to be used on non-search pages (or globally), see `GlobalSearchBox`.
 */

export interface SearchBoxProps {
	SuggestionsList: React.ComponentType<SearchSuggestionsListProps>;
}

function SearchBox({ SuggestionsList = SearchSuggestionsList }: SearchBoxProps) {
	const { store, actor } = useHawkSearch();

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		if (event.key === 'Enter') {
			actor.setSearch({
				Keyword: event.currentTarget.value,
			});
		}
	}

	return (
		<div className="hawk__searchBox">
			<SearchBoxBase
				SuggestionsList={SuggestionsList}
				initialValue={store && store.pendingSearch ? store.pendingSearch.Keyword : ''}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}

export default SearchBox;
