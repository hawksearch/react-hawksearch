import React, { useState, useEffect } from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import HawkClient from 'net/HawkClient';
import { Response } from 'models/Autocomplete';
import { useHawkConfig } from 'components/ConfigProvider';

interface SearchSuggestionsProps<Item> {
	/** The user entered search string in the autocomplete text input. */
	query: string;

	/** Downshift's render prop parameter. */
	downshift: ControllerStateAndHelpers<Item>;
}

function SearchSuggestions<Item>({ query, downshift }: SearchSuggestionsProps<Item>) {
	const client = new HawkClient();

	const [results, setResults] = useState({} as Response);
	const [isLoading, setIsLoading] = useState(false);
	const { config } = useHawkConfig();

	// debounce the input search string so that we only do an autocomplete query every so often
	useEffect(
		() => {
			// default to 200ms if not specified
			const debounceMs = config.autocompleteDebounce || 200;
			const timeout = setTimeout(() => doAutocomplete(query), debounceMs);

			return () => {
				clearTimeout(timeout);
			};
		},
		[query, config.autocompleteDebounce]
	);

	/**
	 * Performs an autocomplete request to the Hawk API and populates the result set of this component.
	 * @param input The user entered search string that results will be autocompleted for.
	 */
	async function doAutocomplete(input: string) {
		setIsLoading(true);

		const response = await client.autocomplete({
			ClientGuid: config.clientGuid,
			Keyword: input,
			DisplayFullResponse: true,
		});

		setIsLoading(false);

		if (response === null) {
			return;
		}

		setResults(response);
	}

	const { Products: products } = results;

	const { getMenuProps, getItemProps, highlightedIndex } = downshift;

	return (
		<div className="autosuggest-menu">
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

				{!isLoading && products && products.length === 0 && (
					<li className="autosuggest-menu__item">No results.</li>
				)}
			</ul>
		</div>
	);
}

export default SearchSuggestions;
