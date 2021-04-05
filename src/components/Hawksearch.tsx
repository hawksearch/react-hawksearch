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
	widgetBinding?: string;
}

function Hawksearch(props: HawksearchProps) {
	if (props.config.enableTrackEvent && props.config.trackEventUrl) {
		// Set URL to track event
		TrackingEvent.setTrackingURL(props.config.trackEventUrl);
		TrackingEvent.setTrackConfig(props.config.trackConfig);
		TrackingEvent.setClientGUID(props.config.clientGuid);
	}

	let widgetBinding = props.widgetBinding;

	if (!widgetBinding) {
		widgetBinding = 'single';
	}

	return (
		<ConfigProvider config={props.config} widgetBinding={widgetBinding}>
			<StoreProvider initialSearch={props.initialSearch} widgetBinding={widgetBinding}>{props.children}</StoreProvider>
		</ConfigProvider>
	);
}

export default Hawksearch;
