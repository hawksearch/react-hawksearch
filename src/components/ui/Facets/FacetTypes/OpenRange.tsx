import React, { useState } from 'react';
import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets';

function OpenRange() {
	const {} = useHawkSearch();
	const {
		state: { facetValues },
		actor,
	} = useFacet();

	// the open range boundary values are defined by the first facet value. or null if there is no first value

	const range = facetValues.length > 0 ? facetValues[0] : null;

	const rangeStart = (range && range.RangeStart) || '';
	const rangeEnd = (range && range.RangeEnd) || '';

	// if there's no range, initialize to empty strings
	const [minValue, setStartValue] = useState(rangeStart || '');
	const [maxValue, setEndValue] = useState(rangeEnd || '');

	if (rangeStart === null || rangeEnd === null) {
		// this facet is somehow misconfigured so don't render
		return null;
	}

	function onRangeStartChange(event: React.FormEvent<HTMLInputElement>) {
		setFacetValues(event.currentTarget.value, maxValue);
	}

	function onRangeEndChange(event: React.FormEvent<HTMLInputElement>) {
		setFacetValues(minValue, event.currentTarget.value);
	}

	function setFacetValues(startVal: string, endVal: string) {
		setStartValue(startVal);
		setEndValue(endVal);
		// TODO: api doesn't handle case when there is single boundary condition
		// this hack replace empty string with space which will not working but API will handle the request
		if (startVal === '') {
			startVal = ' ';
		}
		if (endVal === '') {
			endVal = ' ';
		}
		// end of the hack

		// this selection is sent to hawk separated by commas, so build the value here
		const selection = `${startVal},${endVal}`;
		actor.setFacets([selection]);
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<div className="hawk-open-range">
					<input
						type="text"
						className="hawk-text-input value-start"
						data-type="currency"
						value={minValue}
						onChange={onRangeStartChange}
					/>
					<input
						type="text"
						className="hawk-text-input value-end"
						onChange={onRangeEndChange}
						value={maxValue}
					/>
				</div>
			</div>
		</div>
	);
}

export default OpenRange;
