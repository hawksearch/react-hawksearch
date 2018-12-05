import React from 'react';

import { Facet as FacetModel } from 'models/Facets';
import FacetValue from './FacetValue';

export interface FacetProps {
	facet: FacetModel;
}

function Facet({ facet }: FacetProps) {
	return (
		<li key={facet.FacetId}>
			<span>{facet.Name}</span>
			<ol>
				{facet.Values.map(
					value =>
						value.Value && (
							<FacetValue key={`${facet.FacetId}|${value.Value}`} facet={facet} value={value} />
						)
				)}
			</ol>
		</li>
	);
}

export default Facet;
