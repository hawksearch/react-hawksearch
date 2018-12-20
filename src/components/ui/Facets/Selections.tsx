import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

function Selections() {
	const {
		store: { searchResults },
	} = useHawkSearch();

	if (!searchResults) {
		return null;
	}

	return (
		<div>
			<p>You've Selected</p>

			{Object.keys(searchResults.Selections).map(key => {
				const selection = searchResults.Selections[key];

				return (
					<div key={key}>
						<span>{selection.Label}</span>

						<ul>
							{selection.Items.map(item => (
								<li key={item.Value}>{item.Label}</li>
							))}
						</ul>
					</div>
				);
			})}
		</div>
	);
}

export default Selections;
