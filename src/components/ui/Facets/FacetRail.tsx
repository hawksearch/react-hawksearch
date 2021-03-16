import React, { useState } from 'react';
import FacetList from './FacetList';

import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'util/WindowResize';

function FacetRail() {
	const { t, i18n } = useTranslation();
	const [isCollapsed, setCollapsed] = useState(false);
	const size = useWindowSize();
	return (
		<div className="hawk-facet-rail">
			<div
				className="hawk-facet-rail__heading"
				{...(size.width <= 767 && { onClick: () => setCollapsed(!isCollapsed) })}
			>
				{t('Narrow Results')}
			</div>

			{!isCollapsed && <FacetList />}
		</div>
	);
}

export default FacetRail;
