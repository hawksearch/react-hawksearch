import React, { useState } from 'react';

import { useFacet } from './Facet';
import { Value } from 'models/Facets';
import { useHawkSearch } from 'components/StoreProvider';

function Checkbox() {
	const { actor } = useHawkSearch();
	const { facet } = useFacet();

	const [filter, setFilter] = useState('');

	function selectFacet(facetValue: Value) {
		setFilter('');
		actor.selectFacet(facet, facetValue);
	}

	function negateFacet(facetValue: Value) {
		setFilter('');
		actor.selectFacet(facet, facetValue, /* negate */ true);
	}

	const filteredFacets = facet.Values.filter(val => {
		if (!val.Label) {
			// if a facet value doesn't have a label, we can't really filter down to it
			// so exclude it
			return false;
		}

		return val.Label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
	});

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
					{filteredFacets.map(value => (
						<li key={value.Value}>
							{value.Selected ? '[x]' : null}
							<button onClick={e => selectFacet(value)}>{value.Label}</button>
							<button onClick={e => negateFacet(value)}>X</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Checkbox;
