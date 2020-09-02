import React from 'react';

import ConfigProvider from 'components/ConfigProvider';
import StoreProvider from 'components/StoreProvider';
import { HawkSearchConfig } from 'types/HawkSearchConfig';
import { Request } from 'models/Search';
import TrackingEvent from './TrackingEvent';

export interface HawkSearchProps {
	/** Global configuration. */
	config: HawkSearchConfig;
	/** The initial search to perform when initializing the search components. */
	initialSearch?: Partial<Request>;
	children: React.ReactNode;
}

function HawkSearch(props: HawkSearchProps) {
	if (props.config.trackEventUrl) {
		// Set URL to track event
		TrackingEvent.setTrackingURL(props.config.trackEventUrl);
		TrackingEvent.setClientGUID(props.config.clientGuid);
	}
	return (
		<ConfigProvider config={props.config}>
			<StoreProvider initialSearch={props.initialSearch}>{props.children}</StoreProvider>
		</ConfigProvider>
	);
}

export default HawkSearch;
