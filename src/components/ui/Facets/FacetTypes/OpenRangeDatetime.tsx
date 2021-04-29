import React, { useState } from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';

function replaceHyphen(date: string) {
	if (!date) {
		return date;
	}
	return date.replace(/-/g, '/');
}

function OpenRangeDatetime() {
	const { actor: hawkActor } = useHawksearch();

	const {
		state: { facetValues },
		facet,
		actor,
	} = useFacet();

	const daterange = facetValues.length > 0 ? facetValues[0] : null;
	const rangeStartDate = daterange && daterange.RangeStart ? daterange.RangeStart.slice(0, 16) : '';
	const rangeEndDate = daterange && daterange.RangeEnd ? daterange.RangeEnd.slice(0, 16) : '';

	// if there's no range, initialize to empty strings
	const [minDateValue, setdateStartValue] = useState(rangeStartDate || '');
	const [maxDateValue, setdateEndValue] = useState(rangeEndDate || '');
	// the open range boundary values are defined by the first facet value. or null if there is no first value

	const range = facetValues.length > 0 ? facetValues[0] : null;

	const rangeStart = (range && range.RangeStart) || '';
	const rangeEnd = (range && range.RangeEnd) || '';

	if (rangeStart === null || rangeEnd === null) {
		// this facet is somehow misconfigured so don't render
		return null;
	}

	function ondateRangeStartChange(event: React.FormEvent<HTMLInputElement>) {
		setdateFacetValues(event.currentTarget.value, maxDateValue);
	}

	function ondateRangeEndChange(event: React.FormEvent<HTMLInputElement>) {
		setdateFacetValues(minDateValue, event.currentTarget.value);
	}

	function setdateFacetValues(startVal: string, endVal: string) {
		setdateStartValue(startVal);
		setdateEndValue(endVal);

		// this selection is sent to hawk separated by commas, so build the value here

		if (startVal === '' && endVal === '') {
			hawkActor.clearFacet(facet);
		} else {
			const selection = `${replaceHyphen(startVal)},${replaceHyphen(endVal)}`;
			actor.setFacets([selection]);
		}
	}

	return (
		<div className="hawk-facet-rail__facet-values">
			<div className="hawk-facet-rail__facet-values-link">
				<div className="hawk-open-range hawk-facet-type-date">
					<input
						type="datetime-local"
						className="hawk-text-input hawk-date-value-start"
						value={minDateValue}
						min={rangeStartDate}
						max={rangeEndDate}
						onChange={ondateRangeStartChange}
					/>
					<input
						type="datetime-local"
						className="hawk-text-input hawk-date-value-end"
						value={maxDateValue}
						min={rangeStartDate}
						max={rangeEndDate}
						onChange={ondateRangeEndChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default OpenRangeDatetime;
