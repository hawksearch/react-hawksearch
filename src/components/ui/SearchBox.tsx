import React from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';

import { useHawkSearch } from 'components/StoreProvider';
import SearchSuggestions from './SearchSuggestions';

function SearchBox() {
	const { store, actor } = useHawkSearch();

	function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			doSearch(event.currentTarget.value);
		}
	}

	function doSearch(keyword: string) {
		actor.setSearch({
			Keyword: keyword,
		});
	}

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
										doSearch(event.currentTarget.value);
									}
								},
							})}
						/>
						{showSuggestions ? <SearchSuggestions query={inputValue || ''} downshift={options} /> : null}
					</div>
				);
			}}
		</Downshift>
	);
}

export default SearchBox;
