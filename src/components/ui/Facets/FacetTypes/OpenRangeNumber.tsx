import React, { useState } from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';

function OpenRangeNumber() {
	const { actor: hawkActor } = useHawksearch();

	const {
		state: { facetValues },
		facet,
		actor,
	} = useFacet();

	// the open range boundary values are defined by the first facet value. or null if there is no first value
	const range = facetValues.length > 0 ? facetValues[0] : null;

	const rangeStart = (range && range.RangeStart) || '';
	const rangeEnd = (range && range.RangeEnd) || '';

	// if there's no range, initialize to empty strings
	const [minValue, setStartValue] = useState(rangeStart || '');
	const [maxValue, setEndValue] = useState(rangeEnd || '');

	function onRangeStartChange(event: React.FormEvent<HTMLInputElement>) {
		setFacetValues(event.currentTarget.value, maxValue);
	}

	function onRangeEndChange(event: React.FormEvent<HTMLInputElement>) {
		setFacetValues(minValue, event.currentTarget.value);
	}

	function setFacetValues(startVal: string, endVal: string) {
		setStartValue(startVal);
		setEndValue(endVal);

		// this selection is sent to hawk separated by commas, so build the value here

		if (startVal === '' && endVal === '') {
			hawkActor.clearFacet(facet);
		} else {
			const selection = `${startVal},${endVal}`;
			actor.setFacets([selection]);
		}
	}

	if (rangeStart === null || rangeEnd === null) {
		// this facet is somehow misconfigured so don't render
		return null;
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

export default OpenRangeNumber;
