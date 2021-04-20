import React, { useState } from 'react';
//import { useWindowSize } from '@react-hook/window-size';
import { useWindowSize } from 'util/WindowResize';

import { useTranslation } from 'react-i18next';
import FacetList from './FacetList';

function FacetRail() {
	const { t, i18n } = useTranslation();
	const [isCollapsed, setCollapsed] = useState(false);
	//const [width] = useWindowSize();
	const size = useWindowSize();

	return (
		<div className="hawk-facet-rail">
			<div
				className="hawk-facet-rail__heading"
				{...(size.width <= 767 && { onClick: () => setCollapsed(!isCollapsed) })}
			>
				{t('Filter By')}
			</div>

			{!isCollapsed && <FacetList />}
		</div>
	);
}

export default FacetRail;
