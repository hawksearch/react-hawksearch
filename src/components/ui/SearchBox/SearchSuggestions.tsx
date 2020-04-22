import React, { useState, useEffect } from 'react';
import { ControllerStateAndHelpers } from 'downshift';
import axios, { CancelToken } from 'axios';

import HawkClient from 'net/HawkClient';
import { Response, Product } from 'models/Autocomplete';
import { useHawkConfig } from 'components/ConfigProvider';

interface SearchSuggestionsProps {
	/** The user entered search string in the autocomplete text input. */
	query: string;

	/** Downshift's render prop parameter. */
	downshift: ControllerStateAndHelpers<Product>;
}

function SearchSuggestions({ query, downshift }: SearchSuggestionsProps) {
	const { config } = useHawkConfig();

	const client = new HawkClient(config);

	const [results, setResults] = useState({} as Response);
	const [isLoading, setIsLoading] = useState(false);

	// debounce the input search string so that we only do an autocomplete query every so often
	useEffect(() => {
		// default to 200ms if not specified
		const debounceMs = config.autocompleteDebounce || 200;

		const cts = axios.CancelToken.source();
		const timeout = setTimeout(() => doAutocomplete(query, cts.token), debounceMs);

		return () => {
			cts.cancel();
			clearTimeout(timeout);
		};
	}, [query, config.autocompleteDebounce]);

	/**
	 * Performs an autocomplete request to the Hawk API and populates the result set of this component.
	 * @param input The user entered search string that results will be autocompleted for.
	 */
	async function doAutocomplete(input: string, cancellationToken?: CancelToken) {
		setIsLoading(true);

		let response: Response | null = null;

		try {
			response = await client.autocomplete(
				{
					ClientGuid: config.clientGuid,

					Keyword: input,
					DisplayFullResponse: true,
				},
				cancellationToken
			);
		} catch (error) {
			if (axios.isCancel(error)) {
				// if the request was cancelled, it's because this component was updated
				return;
			}

			console.error('Autocomplete request error:', error);
		}

		setIsLoading(false);

		if (response) {
			setResults(response);
		}
	}

	const { Products: products } = results;

	const { getMenuProps, getItemProps, highlightedIndex } = downshift;

	return (
		<div className="autosuggest-menu">
			<ul
				className="dropdown-menu autosuggest-menu__list"
				{...getMenuProps({ 'aria-label': 'Auto suggest menu' })}
			>
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
