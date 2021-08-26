import React, { useState } from 'react';

import ConfigProvider from 'components/ConfigProvider';
import StoreProvider from 'components/StoreProvider';
import { HawksearchConfig } from 'types/HawksearchConfig';
import { Request } from 'models/Search';
import TrackingEvent from './TrackingEvent';
import { createWidgetId } from 'helpers/utils';

export interface HawksearchProps {
	/** Global configuration. */
	config: HawksearchConfig;
	/** The initial search to perform when initializing the search components. */
	initialSearch?: Partial<Request>;
	children: React.ReactNode;
}

function Hawksearch(props: HawksearchProps) {
	const id = createWidgetId();
	const [widgetId, setWidgetId] = useState(id);

	if (props.config.enableTrackEvent && props.config.trackEventUrl) {
		// Set URL to track event
		TrackingEvent.setTrackingURL(props.config.trackEventUrl);
		TrackingEvent.setTrackConfig(props.config.trackConfig);
		TrackingEvent.setClientGUID(props.config.clientGuid);
		TrackingEvent.setLanguage(props.config.language);
	}

	return (
		<ConfigProvider config={props.config}>
			<StoreProvider initialSearch={props.initialSearch} widgetId={widgetId}>
				{props.children}
			</StoreProvider>
		</ConfigProvider>
	);
}

export default Hawksearch;
