import React, { useState, useEffect } from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';

import { Response } from 'models/Autocomplete';
import HawkClient from 'net/HawkClient';

function HomeSearchBox() {
	return (
		<Downshift>
			{(options: ControllerStateAndHelpers<{}>) => {
				const { isOpen, inputValue, getInputProps } = options;

				const showSuggestions = isOpen && inputValue && inputValue.length > 0;
				return (
					<div>
						<input
							style={{ width: '100%' }}
							{...getInputProps({
								onKeyDown: event => {
									if (event.key === 'Enter') {
										console.log('should redirect to search.html?keyword=' + inputValue);

										// TODO: configurable url
										location.assign('search.html?keyword=' + inputValue);
									}
								},
							})}
						/>
						{showSuggestions ? <SearchBoxData query={inputValue} /> : null}
					</div>
				);
			}}
		</Downshift>
	);
}

function SearchBoxData({ query }) {
	const client = new HawkClient();

	const [results, setResults] = useState<Response>({} as Response);

	async function getAutoSuggest(input: string) {
		const response = await client.autocomplete({
			ClientGuid: 'f51060e1c38446f0bacdf283390c37e8',
			Keyword: input,
			DisplayFullResponse: true,
		});

		if (response === null) {
			return;
		}

		setResults(response);
	}

	useEffect(
		() => {
			const timeout = setTimeout(() => getAutoSuggest(query), 200);

			return () => {
				clearTimeout(timeout);
			};
		},
		[query]
	);

	const { Products: products, Content: content } = results;

	return (
		<>
			<ul>{products && products.map(prod => <li key={prod.Results.DocId}>{prod.ProductName}</li>)}</ul>
			<ul>{content && content.map(cont => <li key={cont.Results.DocId}>{cont.Value}</li>)}</ul>
		</>
	);
}

export default HomeSearchBox;
