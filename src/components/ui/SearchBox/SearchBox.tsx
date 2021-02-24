import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawksearch } from 'components/StoreProvider';
import SearchBoxBase from 'components/ui/SearchBox/SearchBoxBase';
import { Product } from 'models/Autocomplete';
import { CustomSuggestionListProps } from 'models/Autocomplete/CustomSuggestionList';

/**
 * This component is the search input box (with autosuggest) that should be utilized on search pages. For a simple
 * search input box that is meant to be used on non-search pages (or globally), see `GlobalSearchBox`.
 */

interface SearchBoxProps {
	SuggestionList?: React.ComponentType<CustomSuggestionListProps>;
}

function SearchBox({ SuggestionList }: SearchBoxProps) {
	const { store, actor } = useHawksearch();

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		if (event.key === 'Enter') {
			actor.setSearch({
				PageId: undefined,
				CustomUrl: undefined,
				Keyword: encodeURIComponent(event.currentTarget.value),
				FacetSelections: undefined,
				IgnoreSpellcheck: false,
			});
		}
	}

	// On Select view all matches from suggestion list
	function handleViewAllMatches(downshift: ControllerStateAndHelpers<Product>) {
		const { inputValue, closeMenu } = downshift;
		actor.setSearch({
			PageId: undefined,
			CustomUrl: undefined,
			Keyword: inputValue || '',
		});
		closeMenu();
	}

	return (
		<div className="hawk__searchBox">
			<SearchBoxBase
				onViewMatches={handleViewAllMatches}
				initialValue={store && store.pendingSearch ? store.pendingSearch.Keyword : ''}
				onSubmit={handleSubmit}
				SuggestionList={SuggestionList}
			/>
		</div>
	);
}

export default SearchBox;
