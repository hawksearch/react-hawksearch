import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useTranslation } from 'react-i18next';
import Singleton from 'components/Singleton';

function Sorting() {
	const {
		store: { searchResults, pendingSearch },
		actor,
	} = useHawkSearch();

	const { t, i18n } = useTranslation();

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		Singleton.track('searchtracking', {
			trackingId: searchResults ? searchResults.TrackingId : '',
			typeId: 2,
		});
		actor.setSearch({
			SortBy: event.currentTarget.value,
		});
	}

	return (
		<div className="hawk-sorting">
			<span className="hawk-sorting__label">{t('Sort By')}</span>

			<select value={pendingSearch.SortBy} onChange={onChange}>
				{searchResults ? (
					searchResults.Sorting.Items.map(sortingItem => (
						<option key={sortingItem.Value} value={sortingItem.Value} selected={sortingItem.Selected}>
							{sortingItem.Label}
						</option>
					))
				) : (
					<option value="score">Best Match</option>
				)}
			</select>
		</div>
	);
}

export default Sorting;
