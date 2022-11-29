import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkConfig } from 'components/ConfigProvider';
import { Product } from 'models/Autocomplete';
import SearchBoxBase from 'components/ui/SearchBox/SearchBoxBase';
import { useHawksearch } from 'components/StoreProvider';
import { CustomSuggestionListProps } from 'components/ui/AutoComplete/CustomSuggestionList';

interface SearchBoxProps {
	SuggestionList?: React.ComponentType<CustomSuggestionListProps>;
}

/**
 * This component is a simple search input box (with autosuggest) that can be placed globally throughout the site.
 * This search box is intended to be used on non-search pages. On search pages, the `SearchBox` component should be
 * used instead.
 */
function GlobalSearchBox({ SuggestionList }: SearchBoxProps) {
	const { config } = useHawkConfig();
	const { store, actor } = useHawksearch();
	const searchUrl = config.searchPageUrl;

	function redirectToPage(inputValue: string | null) {
		let redirect = `${searchUrl}?keyword=${inputValue}`;
		if (config.indexName) {
			redirect += '&indexName=' + config.indexName;
		}

		if (store.language) {
			redirect += '&language=' + store.language;
		}

		location.assign(redirect);
	}

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		const { inputValue } = downshift;

		if (event.key === 'Enter') {
			redirectToPage(inputValue);
		}
	}

	// On select view all matches from suggestions list
	function handleViewAllMatches(downshift: ControllerStateAndHelpers<Product>) {
		const { inputValue, closeMenu } = downshift;
		redirectToPage(inputValue);
		closeMenu();
	}

	return (
		<div className="hawk hawk__searchBox">
			<SearchBoxBase
				onSubmit={handleSubmit}
				onViewMatches={handleViewAllMatches}
				SuggestionList={SuggestionList}
			/>
		</div>
	);
}

export default GlobalSearchBox;
