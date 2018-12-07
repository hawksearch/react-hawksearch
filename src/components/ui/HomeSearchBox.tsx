import React from 'react';

import Downshift, { ControllerStateAndHelpers } from 'downshift';

function HomeSearchBox() {
	function getAutoSuggest() {}

	return (
		<Downshift>
			{(options: ControllerStateAndHelpers<{}>) => {
				const { isOpen, getInputProps } = options;

				return (
					<div>
						<input {...getInputProps()} />
						<ul />
					</div>
				);
			}}
		</Downshift>
	);
}

export default HomeSearchBox;
