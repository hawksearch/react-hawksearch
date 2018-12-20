import React, { useState } from 'react';

import { useFacet } from './Facet';
import { Value } from 'models/Facets';

function Checkbox() {
	const { facet, actor } = useFacet();

	const [filter, setFilter] = useState('');

	function selectFacet(facetValue: Value) {
		setFilter('');
		actor.selectFacet(facetValue);
	}

	return (
		<div>
			<h4>{facet.Name}</h4>

			<div>
				<div>
					<input
						value={filter}
						onChange={e => setFilter(e.currentTarget.value)}
						type="text"
						placeholder="Quick Lookup"
					/>
				</div>

				<ul>
					{facet.Values.filter(val => {
						if (!val.Label) {
							// if a facet value doesn't have a label, we can't really filter down to it
							// so exclude it
							return false;
						}

						return val.Label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
					}).map(value => (
						<li key={value.Value}>
							<button onClick={e => selectFacet(value)}>
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
