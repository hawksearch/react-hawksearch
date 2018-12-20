import React from 'react';

import { useFacet } from './Facet';

function Checkbox() {
	const { facet, actor } = useFacet();

	return (
		<div>
			<h4>{facet.Name}</h4>

			<div>
				<div>
					<input type="text" placeholder="Quick Lookup" />
				</div>

				<ul>
					{facet.Values.map(value => (
						<li key={value.Value}>
							<button onClick={e => actor.selectFacet(value)}>
								{value.Selected ? '[x]' : null} {value.Label}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Checkbox;
