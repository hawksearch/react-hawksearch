import React from 'react';

import ConfigProvider from 'components/ConfigProvider';
import StoreProvider from 'components/StoreProvider';
import { HawksearchConfig } from 'types/HawksearchConfig';
import { Request } from 'models/Search';
import TrackingEvent from './TrackingEvent';

export interface HawksearchProps {
	/** Global configuration. */
	config: HawksearchConfig;
	/** The initial search to perform when initializing the search components. */
	initialSearch?: Partial<Request>;
	children: React.ReactNode;
}

function Hawksearch(props: HawksearchProps) {
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

export default Hawksearch;
