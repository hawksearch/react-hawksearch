import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawkConfig } from 'components/ConfigProvider';
import { Product } from 'models/Autocomplete';
import SearchBoxBase from 'components/SearchBoxBase';

function HomeSearchBox() {
	const { config } = useHawkConfig();

	const searchUrl = config.searchPageUrl || '/search';

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		const { inputValue } = downshift;

		if (event.key === 'Enter') {
			const redirect = `${searchUrl}?keyword=${inputValue}`;

			console.log('should redirect to:', redirect);

			location.assign(redirect);
		}
	}

	return (
		<div className="hawk">
			<SearchBoxBase onSubmit={handleSubmit} />
		</div>
	);
}

export default HomeSearchBox;
