import React, { useEffect, useState } from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { useTranslation } from 'react-i18next';

function SearchResultsLabel() {
	const {
		store: { pendingSearch, searchResults },
	} = useHawksearch();
	const [keyword, setKeyword] = useState('');

	const { t, i18n } = useTranslation();
	useEffect(() => {
		if (searchResults && searchResults.AdjustedKeyword) {
			setKeyword(decodeURIComponent(searchResults.AdjustedKeyword));
		} else {
			setKeyword(decodeURIComponent(pendingSearch.Keyword || ''));
		}
	}, [searchResults]);

	if (!pendingSearch.Keyword) {
		// no selections, so render nothing
		return null;
	}

	return (
		<div className="hawk-facet-rail__results-label">
			<h3>{pendingSearch.Keyword ? t('Search Results for') + ' ' + keyword : t('Search Results')}</h3>
		</div>
	);
}

export default SearchResultsLabel;
