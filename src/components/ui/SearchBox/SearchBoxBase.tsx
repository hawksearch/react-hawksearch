import React from 'react';
import { DownshiftState, StateChangeOptions, ControllerStateAndHelpers } from 'downshift';

import { Product } from 'models/Autocomplete';
import SearchSuggestions from 'components/ui/SearchBox/SearchSuggestions';

const Downshift = React.lazy(() => import(/* webpackChunkName: "downshift" */ 'downshift'));

interface SearchBoxBaseProps {
	initialValue?: string;
	onSubmit: (event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) => void;
}

function SearchBoxBase({ initialValue, onSubmit }: SearchBoxBaseProps) {
	/** Called when the internal state of downshift changes - we're handling a couple custom behaviors here */
	function handleStateChange(
		state: DownshiftState<Product>,
		changes: StateChangeOptions<Product>
	): Partial<StateChangeOptions<Product>> {
		if (
			// NOTE: these strings are hardcoded to support code splitting downshift.
			// using the constants from the package will prevent code splitting from operating correctly
			changes.type === '__autocomplete_mouseup__' ||
			changes.type === '__autocomplete_keydown_enter__' ||
			changes.type === '__autocomplete_click_item__'
		) {
			// when:
			//
			//  1. the mouse the clicked outside of downshift
			//  2. enter is pressed on the keyboard
			//  3. an item is selected from the dropdown
			//
			// then we want to retain the input value that was originally typed in. by default downshift
			// will clear the input value, so we're overriding this behavior here.
			return { ...changes, inputValue: state.inputValue };
		}

		return changes;
	}

	/** Called when an item has been selected from the autocomplete results. */
	function handleItemChange(item: Product, downshift: ControllerStateAndHelpers<Product>) {
		location.assign(item.Url);
	}

	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Downshift
				stateReducer={handleStateChange}
				itemToString={(item: Product | null) => (item ? item.ProductName : '')}
				onChange={handleItemChange}
				initialInputValue={initialValue}
			>
				{(options: ControllerStateAndHelpers<Product>) => {
					const { isOpen, inputValue, getInputProps, openMenu } = options;

					const showSuggestions = isOpen && inputValue && inputValue.length > 0;
					return (
						<div className="hawk__searchBox__searchInput" aria-labelledby="autocomplete-search-box">
							<div id="autocomplete-search-box" className="hidden-label">
								Autocomplete search box
							</div>
							<input
								type="text"
								style={{ width: '100%' }}
								{...getInputProps({
									onKeyDown: event => {
										if (onSubmit) {
											onSubmit(event, options);
										}
									},

									// when the input is focused again, reopen the downshift menu
									onFocus: () => {
										if (inputValue && inputValue.length > 0) {
											openMenu();
										}
									},

									placeholder: 'Enter a search term',
									'aria-labelledby': 'autocomplete-search-box',
								})}
							/>
							{showSuggestions ? (
								<SearchSuggestions query={inputValue || ''} downshift={options} />
							) : null}
						</div>
					);
				}}
			</Downshift>
		</React.Suspense>
	);
}

export default SearchBoxBase;
