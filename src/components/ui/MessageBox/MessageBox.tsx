import React, { useState, useEffect } from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useHawkConfig } from 'components/ConfigProvider';

function MessageBox() {
	const { store, actor } = useHawksearch();
	const { config } = useHawkConfig();

	useEffect(() => {
		actor.getLandingPageData({
			ClientGuid: config.clientGuid,
		});
	}, []);
	
	if (store.isLandingPageExpired === true) {
		return (
			<div className="hawk__messagebox" role="alert">
				Note: This page is currently expired and will not show any results on the frontend. Results you are
				seeing below are for preview/setup purpose only.
			</div>
		);
	} else {
		return null;
	}
}

export default MessageBox;
