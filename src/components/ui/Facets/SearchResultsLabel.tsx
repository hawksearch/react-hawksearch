import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useTranslation } from 'react-i18next';

function SearchResultsLabel() {
	const {
		store: { pendingSearch },
	} = useHawkSearch();

	const { t, i18n } = useTranslation();

	if (!pendingSearch.Keyword) {
		// no selections, so render nothing
		return null;
	}

	return (
		<div className="hawk-facet-rail__results-label">
			<h3>{pendingSearch.Keyword ? (t('Search Results for') + ' ' + pendingSearch.Keyword) : t('Search Results')}</h3>
		</div>
	);
}

export default SearchResultsLabel;
