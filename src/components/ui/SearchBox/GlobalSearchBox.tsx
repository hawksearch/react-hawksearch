import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkConfig } from 'components/ConfigProvider';
import { Product } from 'models/Autocomplete';
import SearchBoxBase from 'components/ui/SearchBox/SearchBoxBase';
import { useHawksearch } from 'components/StoreProvider';

/**
 * This component is a simple search input box (with autosuggest) that can be placed globally throughout the site.
 * This search box is intended to be used on non-search pages. On search pages, the `SearchBox` component should be
 * used instead.
 */
function GlobalSearchBox() {
	const { config } = useHawkConfig();
	const { actor } = useHawksearch();

	const searchUrl = config.searchPageUrl;

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		const { inputValue } = downshift;

		if (event.key === 'Enter') {
			let redirect = `${searchUrl}?keyword=${inputValue}`;

			if (config.indexName) {
				redirect += '&indexName=' + config.indexName;
			}

			location.assign(redirect);
		}
	}

	// On select view all matches from suggestions list
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
		<div className="hawk hawk__searchBox">
			<SearchBoxBase onSubmit={handleSubmit} onViewMatches={handleViewAllMatches} />
		</div>
	);
}

export default GlobalSearchBox;
