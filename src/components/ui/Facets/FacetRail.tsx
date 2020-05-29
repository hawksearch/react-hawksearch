import React from 'react';
import FacetList from './FacetList';

import { useTranslation } from 'react-i18next';

function FacetRail() {
	const { t, i18n } = useTranslation();

	return (
		<div className="hawk-facet-rail">
			<div className="hawk-facet-rail__heading">{t('Narrow Results')}</div>

			<FacetList />
		</div>
	);
}

export default FacetRail;
