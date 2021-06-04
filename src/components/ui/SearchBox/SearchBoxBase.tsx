import React, { useEffect, useState } from 'react';
import { DownshiftState, StateChangeOptions, ControllerStateAndHelpers } from 'downshift';

import SearchSuggestions from 'components/ui/SearchBox/SearchSuggestions';
import { Suggestion, SuggestionStrategyMatch } from 'models/Autocomplete/Suggestion';
import { getAutocompleteStrategies } from '../Facets/Overrides';
import { useHawkConfig } from 'components/ConfigProvider';
import { Product } from 'models/Autocomplete';
import { useHawksearch } from 'components/StoreProvider';
import { useTranslation } from 'react-i18next';
import { CustomSuggestionListProps } from 'models/Autocomplete/CustomSuggestionList';

import Downshift from 'downshift';

export interface SearchBoxBaseProps {
	initialValue?: string;
	onSubmit: (event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Suggestion>) => void;
	onViewMatches: (downshift: ControllerStateAndHelpers<Suggestion>) => void;
	SuggestionList?: React.ComponentType<CustomSuggestionListProps>;
}

function SearchBoxBase({ initialValue, onSubmit, onViewMatches, SuggestionList }: SearchBoxBaseProps) {
	const { config } = useHawkConfig();
	const strategies = getAutocompleteStrategies(config.autocompleteStrategies || []);
	const { t, i18n } = useTranslation();
	const {
		store: { pendingSearch, searchResults },
	} = useHawksearch();
	const [initialInput, setInitialInput] = useState('');

	// Will update the suggested selected keyword in the autocomplete input box
	useEffect(() => {
		setInitialInput(decodeURIComponent(pendingSearch.Keyword || ''));
	}, [pendingSearch.Keyword, initialValue, pendingSearch.IgnoreSpellcheck]);

	// Will update the Adjusted keyword in the autocomplete input box
	useEffect(() => {
		if (searchResults && searchResults.AdjustedKeyword) {
			setInitialInput(decodeURIComponent(searchResults.AdjustedKeyword));
		}
	}, [searchResults]);

	/** Called when the internal state of downshift changes - we're handling a couple custom behaviors here */
	function handleStateChange(
		state: DownshiftState<Suggestion>,
		changes: StateChangeOptions<Suggestion>
	): Partial<StateChangeOptions<Suggestion>> {
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
	function handleItemChange(item: Suggestion, downshift: ControllerStateAndHelpers<Suggestion>) {
		if (!item) {
			return;
		}

		const matchedStrategy = strategies.find(strategy => strategy.SuggestionType === item.SuggestionType);
		if (!matchedStrategy) {
			return;
		}

		(matchedStrategy as SuggestionStrategyMatch).SuggestionStrategy.handleItemChange(item, downshift);
	}

	function handleToString(item: Suggestion): string {
		if (!item) {
			return '';
		}
		const matchedStrategy = strategies.find(strategy => strategy.SuggestionType === item.SuggestionType);
		if (!matchedStrategy) {
			return '';
		}
		return (matchedStrategy as SuggestionStrategyMatch).SuggestionStrategy.toString(item);
	}

	return (
		<React.Suspense fallback={<div>{t('Loading')}...</div>}>
			<Downshift
				stateReducer={handleStateChange}
				itemToString={(item: Suggestion) => handleToString(item)}
				onChange={handleItemChange}
				initialInputValue={decodeURIComponent(initialValue || '')}
			>
				{(options: ControllerStateAndHelpers<Suggestion>) => {
					const { isOpen, inputValue, getInputProps, openMenu, closeMenu } = options;

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
											closeMenu();
										}
									},

									// when the input is focused again, reopen the downshift menu
									onFocus: () => {
										if (inputValue && inputValue.length > 0) {
											openMenu();
										}
									},

									placeholder: t('Enter a search term'),
									'aria-labelledby': 'autocomplete-search-box',
								})}
							/>
							{showSuggestions ? (
								<SearchSuggestions
									query={inputValue || ''}
									downshift={options}
									onViewMatches={onViewMatches}
									SuggestionList={SuggestionList}
								/>
							) : null}
						</div>
					);
				}}
			</Downshift>
		</React.Suspense>
	);
}

export default SearchBoxBase;
