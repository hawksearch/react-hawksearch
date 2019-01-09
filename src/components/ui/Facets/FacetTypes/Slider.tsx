import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';
import { FacetSelectionState } from 'store/Store';
import Rheostat, { PublicState } from 'rheostat';

function Link() {
	const { store } = useHawkSearch();
	const {
		facet,
		state: { facetValues },
		actor,
		renderer,
	} = useFacet();

	if (facet.Values.length === 0) {
		return null;
	}

	function onChange(state: PublicState) {
		const [minValue, maxValue] = state.values;
		const selection = `${min},${max}`;

		actor.setFacets([selection]);
	}

	const range = facet.Values[0];

	const min = parseInt(range.RangeMin || '', 10);
	const max = parseInt(range.RangeMax || '', 10);

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<Rheostat min={min} max={max} values={[min, max]} onChange={onChange} />
			</div>
		</div>
	);
}

export default Link;
