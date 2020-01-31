import React, { useState, useEffect } from 'react';
import { ControllerStateAndHelpers } from 'downshift';
import axios, { CancelToken } from 'axios';

import HawkClient from 'net/HawkClient';
import { Response, Product, Category } from 'models/Autocomplete';
import { useHawkConfig } from 'components/ConfigProvider';
import { SearchSuggestionsListProps } from './SearchSuggestionsList';
import { Suggestion } from 'models/Autocomplete/Suggestion';

export interface SearchSuggestionsProps {
	/** The user entered search string in the autocomplete text input. */
	query: string;

	/** Downshift's render prop parameter. */
	downshift: ControllerStateAndHelpers<Suggestion>;

	SuggestionsList: React.ComponentType<SearchSuggestionsListProps>;
	onViewMatches: (downshift: ControllerStateAndHelpers<Suggestion>) => void;
}

function SearchSuggestions({ SuggestionsList, query, downshift, onViewMatches }: SearchSuggestionsProps) {
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
			response = await client
				.autocomplete(
					{
						ClientGuid: config.clientGuid,

						Keyword: input,
						DisplayFullResponse: true,
					},
					cancellationToken
				)
				.then(o => {
					// ensure, returned object will return response
					// since by default, axios uses JSON.parse to parse an object,
					// it doesn't recognize it as Response type - this line is to prevent it
					return Object.assign(new Response(o));
				});
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

	return (
		<div className="autosuggest-menu">
			<SuggestionsList
				onViewMatches={onViewMatches}
				downshift={downshift}
				isLoading={isLoading}
				searchResults={results}
			/>
		</div>
	);
}

export default SearchSuggestions;
