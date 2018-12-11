import React from 'react';
import Downshift, { ControllerStateAndHelpers, StateChangeOptions, DownshiftState } from 'downshift';

import SearchSuggestions from './SearchSuggestions';
import { useHawkConfig } from 'components/ConfigProvider';
import { Product } from 'models/Autocomplete';

function HomeSearchBox() {
	const { config } = useHawkConfig();

	const searchUrl = config.searchPageUrl || '/search';

	function handleStateChange(
		state: DownshiftState<Product>,
		changes: StateChangeOptions<Product>
	): Partial<StateChangeOptions<Product>> {
		if (changes.type === Downshift.stateChangeTypes.mouseUp) {
			// when the mouse is clicked outside of downshift, retain the input value that was typed in.
			// by default downshift will clear the input value so we override this behavior here.
			return { ...changes, inputValue: state.inputValue };
		}

		return changes;
	}

	return (
		<Downshift stateReducer={handleStateChange} itemToString={(item: Product) => item.ProductName}>
			{(options: ControllerStateAndHelpers<Product>) => {
				const { isOpen, inputValue, getInputProps, openMenu } = options;

				const showSuggestions = isOpen && inputValue && inputValue.length > 0;
				return (
					<div>
						<input
							style={{ width: '100%' }}
							{...getInputProps({
								onKeyDown: event => {
									if (event.key === 'Enter') {
										const redirect = `${searchUrl}?keyword=${inputValue}`;

										console.log('should redirect to:', redirect);

										location.assign(redirect);
									}
								},

								// when the input is focused again, reopen the downshift menu
								onFocus: () => {
									if (inputValue && inputValue.length > 0) {
										openMenu();
									}
								},

								placeholder: 'Enter a search term',
							})}
						/>
						{showSuggestions ? <SearchSuggestions query={inputValue || ''} downshift={options} /> : null}
					</div>
				);
			}}
		</Downshift>
	);
}

export default HomeSearchBox;
