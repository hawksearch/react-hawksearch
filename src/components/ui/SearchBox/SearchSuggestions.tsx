import { Category, Product, Response } from 'models/Autocomplete';
import React, { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';
import { createGuid, getCookie, getVisitExpiry, getVisitorExpiry, setCookie } from 'helpers/utils';

import { ControllerStateAndHelpers } from 'downshift';
import { CustomSuggestionListProps } from 'components/ui/AutoComplete/CustomSuggestionList';
import HawkClient from 'net/HawkClient';
import SearchSuggestionsList from './SearchSuggestionsList';
import { Suggestion } from 'models/Autocomplete/Suggestion';
import { useHawkConfig } from 'components/ConfigProvider';
import { useHawksearch } from 'components/StoreProvider';

interface ClientData {
	VisitorId: string;
	VisitId: string;
	UserAgent: string;
	Custom?: {
		language: string;
	};
}

export interface SearchSuggestionsProps {
	/** The user entered search string in the autocomplete text input. */
	query: string;

	/** Downshift's render prop parameter. */
	downshift: ControllerStateAndHelpers<Suggestion>;

	onViewMatches: (downshift: ControllerStateAndHelpers<Suggestion>) => void;
	SuggestionList?: React.ComponentType<CustomSuggestionListProps>;
}

function SearchSuggestions({ query, downshift, onViewMatches, SuggestionList }: SearchSuggestionsProps) {
	const { config } = useHawkConfig();
	const { store, actor: { getClientData } } = useHawksearch();

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
		// if (!input.trim().length) {
		// 	return;
		// }
		setIsLoading(true);

		let response: Response | null = null;

		try {
			response = await client
				.autocomplete(
					{
						ClientGuid: config.clientGuid,
						Keyword: input,
						IndexName: config.indexName,
						DisplayFullResponse: true,
						FacetSelections: store.pendingSearch.FacetSelections,
						ClientData: getClientData(),
						IsInPreview: config.isInPreview,
						PreviewDate: store.previewDate || undefined,
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
			<SearchSuggestionsList
				onViewMatches={onViewMatches}
				downshift={downshift}
				isLoading={isLoading}
				searchResults={results}
				SuggestionList={SuggestionList}
			/>
		</div>
	);
}

export default SearchSuggestions;
