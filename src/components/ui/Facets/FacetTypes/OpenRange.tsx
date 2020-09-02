import React, { useState } from 'react';
import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import Singleton from 'components/Singleton';

// Format date with hyphen format so input type date can read the value
function formatDate(date: Date) {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 101).toString().substring(1);
	const day = (date.getDate() + 100).toString().substring(1);
	return year + '-' + month + '-' + day;
}

function replaceHyphen(date: string) {
	if (!date) {
		return date;
	}
	return date.replace(/-/g, '/');
}

function OpenRange() {
	const {
		actor: hawkActor,
		store: { searchResults },
	} = useHawkSearch();

	const {
		state: { facetValues },
		facet,
		actor,
	} = useFacet();

	const daterange = facetValues.length > 0 ? facetValues[0] : null;
	const rangeStartDate = daterange && daterange.RangeStart ? formatDate(new Date(daterange.RangeStart)) : '';
	const rangeEndDate = daterange && daterange.RangeEnd ? formatDate(new Date(daterange.RangeEnd)) : '';

	// if there's no range, initialize to empty strings
	const [minDateValue, setdateStartValue] = useState(rangeStartDate || '');
	const [maxDateValue, setdateEndValue] = useState(rangeEndDate || '');
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

		// this selection is sent to hawk separated by commas, so build the value here

		if (startVal === '' && endVal === '') {
			hawkActor.clearFacet(facet);
		} else {
			const selection = `${startVal},${endVal}`;
			actor.setFacets([selection]);
		}
		Singleton.track('searchtracking', {
			trackingId: searchResults ? searchResults.TrackingId : '',
			typeId: 2,
		});
	}

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
		Singleton.track('searchtracking', {
			trackingId: searchResults ? searchResults.TrackingId : '',
			typeId: 2,
		});
	}

	if (facet.DataType && facet.DataType === 'datetime') {
		return (
			<div className="hawk-facet-rail__facet-values">
				<div className="hawk-facet-rail__facet-values-link">
					<div className="hawk-open-range hawk-facet-type-date">
						<input
							type="date"
							className="hawk-text-input hawk-date-value-start"
							value={minDateValue}
							min={rangeStartDate}
							max={rangeEndDate}
							onChange={ondateRangeStartChange}
						/>
						<input
							type="date"
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
