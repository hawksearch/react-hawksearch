import React from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';

import SearchSuggestions from './SearchSuggestions';
import { useHawkConfig } from 'components/ConfigProvider';

function HomeSearchBox() {
	const { config } = useHawkConfig();

	let searchUrl = config.searchUrl;

	if (!searchUrl) {
		searchUrl = '/search';
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
										const redirect = `${searchUrl}?keyword=${inputValue}`;

										console.log('should redirect to:', redirect);

										location.assign(redirect);
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

export default HomeSearchBox;
