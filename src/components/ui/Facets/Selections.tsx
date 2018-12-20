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
		<div style={{ borderBottom: '1px solid black' }}>
			<span>You've Selected</span>

			<ul>
				{Object.keys(searchResults.Selections).map(key => {
					const selection = searchResults.Selections[key];

					return (
						<li key={key}>
							<span>{selection.Label}</span>

							<ul>
								{selection.Items.map(item => (
									<li key={item.Value}>{item.Label}</li>
								))}
							</ul>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Selections;
