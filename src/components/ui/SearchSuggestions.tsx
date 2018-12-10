import React, { useState, useEffect } from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import HawkClient from 'net/HawkClient';
import { Response } from 'models/Autocomplete';

interface SearchSuggestionsProps {
	/** The user entered search string in the autocomplete text input. */
	query: string;

	/** Downshift's render prop parameter. */
	downshift: ControllerStateAndHelpers<{}>;
}

function SearchSuggestions({ query, downshift }: SearchSuggestionsProps) {
	const client = new HawkClient();

	const [results, setResults] = useState<Response>({} as Response);
	const [isLoading, setIsLoading] = useState(false);

	// debounce the input search string so that we only do an autocomplete query every 200ms
	useEffect(
		() => {
			const timeout = setTimeout(() => doAutocomplete(query), 200);

			return () => {
				clearTimeout(timeout);
			};
		},
		[query]
	);

	/**
	 * Performs an autocomplete request to the Hawk API and populates the result set of this component.
	 * @param input The user entered search string that results will be autocompleted for.
	 */
	async function doAutocomplete(input: string) {
		setIsLoading(true);

		const response = await client.autocomplete({
			ClientGuid: 'f51060e1c38446f0bacdf283390c37e8',
			Keyword: input,
			DisplayFullResponse: true,
		});

		setIsLoading(false);

		if (response === null) {
			return;
		}

		setResults(response);
	}

	const { Products: products, Content: content } = results;

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
			</ul>
		</div>
	);
}

export default SearchSuggestions;
