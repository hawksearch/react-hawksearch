import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkConfig } from 'components/ConfigProvider';
import { Product } from 'models/Autocomplete';
import SearchBoxBase from 'components/ui/SearchBox/SearchBoxBase';
import SearchSuggestionsList from './SearchSuggestionsList';

/**
 * This component is a simple search input box (with autosuggest) that can be placed globally throughout the site.
 * This search box is intended to be used on non-search pages. On search pages, the `SearchBox` component should be
 * used instead.
 */
function GlobalSearchBox() {
	const { config } = useHawkConfig();

	const searchUrl = config.searchPageUrl || '/search';

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		const { inputValue } = downshift;

		if (event.key === 'Enter') {
			const redirect = `${searchUrl}?keyword=${inputValue}`;

			location.assign(redirect);
		}
	}

	return (
		<div className="hawk">
			<SearchBoxBase onSubmit={handleSubmit} SuggestionsList={SearchSuggestionsList} />
		</div>
	);
}

export default GlobalSearchBox;
