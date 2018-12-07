import React, { useState, useEffect } from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';

import { Response } from 'models/Autocomplete';
import HawkClient from 'net/HawkClient';

function HomeSearchBox() {
	return (
		<Downshift>
			{(options: ControllerStateAndHelpers<{}>) => {
				const { isOpen, inputValue, getInputProps } = options;

				return (
					<div>
						<input
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
						{isOpen ? <SearchBoxData query={inputValue} /> : null}
					</div>
				);
			}}
		</Downshift>
	);
}

function SearchBoxData({ query }) {
	const client = new HawkClient();

	const [results, setResults] = useState<Response>({});

	async function getAutoSuggest(input: string) {
		const response = await client.autocomplete({
			ClientGuid: 'f51060e1c38446f0bacdf283390c37e8',
			Keyword: input,
		});

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

	return <span>{JSON.stringify(results)}</span>;
}

export default HomeSearchBox;
