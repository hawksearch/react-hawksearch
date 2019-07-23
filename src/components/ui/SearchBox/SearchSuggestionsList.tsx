import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { Response } from 'models/Autocomplete';
import { Suggestion } from 'models/Autocomplete/Suggestion';

export interface SearchSuggestionsListProps {
	isLoading: boolean;
	searchResults: Response;
	downshift: ControllerStateAndHelpers<Suggestion>;
}

function SearchSuggestionsList({ isLoading, searchResults, downshift }: SearchSuggestionsListProps) {
	const { Products: products, ProductHeading } = searchResults;

	const { getItemProps, getMenuProps, highlightedIndex } = downshift;

	return (
		<ul className="dropdown-menu autosuggest-menu__list" {...getMenuProps()}>
			{isLoading && <li className="autosuggest-menu__item">Loading...</li>}
			{products &&
				products.map((item, index) => (
					<li
						className={
							highlightedIndex === index
								? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
								: 'autosuggest-menu__item'
						}
						{...getItemProps({
							item,
							index,
							key: item.Results.DocId,
						})}
					>
						{item.ProductName}
					</li>
				))}
			{!isLoading && products && products.length === 0 && <li className="autosuggest-menu__item">No results.</li>}
		</ul>
	);
}

export default SearchSuggestionsList;
