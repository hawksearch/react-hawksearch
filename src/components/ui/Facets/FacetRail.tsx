import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'util/WindowResize';
import { useHawksearch } from 'components/StoreProvider';
import { useHawkConfig } from 'components/ConfigProvider';
import { useTranslation } from 'react-i18next';
import FacetList from './FacetList';

function FacetRail() {
	const { t, i18n } = useTranslation();
	const [isCollapsed, setCollapsed] = useState(false);
	const size = useWindowSize();
	const { config } = useHawkConfig();
	const { actor } = useHawksearch();

	useEffect(() => {
		actor.getLandingPageData({
			ClientGuid: config.clientGuid,
		});
	}, []);

	
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
