import React, { useEffect, useState } from 'react';
import { useHawksearch } from './StoreProvider';

interface RedirectAlertMessageProps {
	message: string;
	setRedirect: (type: boolean) => void;
}

export interface RedirectURLListenerProps {
	RedirectAlertMessage: React.ComponentType<RedirectAlertMessageProps>;
}

function RedirectURLListener({ RedirectAlertMessage }: RedirectURLListenerProps) {
	const { store } = useHawksearch();
	const [showAlert, setAlert] = useState(false);
	const [shouldRedirect, setRedirect] = useState(false);
	const [redirectURL, setRedirectURL] = useState('');
	useEffect(() => {
		if (store.searchResults && store.searchResults.Redirect.Location) {
			setRedirectURL(store.searchResults.Redirect.Location);
			// NOTE: This will set alert to show toast message
			setAlert(true);
		}
	}, [store.searchResults]);

	// NOTE: It will wait until the timeout is clear
	useEffect(() => {
		if (shouldRedirect) {
			setAlert(false);
			// NOTE: This will redirect the parent window to the given URL
			window.top.location.href = redirectURL;
		}
		return () => {
			setRedirect(false);
		};
	}, [shouldRedirect]);

	if (!showAlert) {
		return null;
	}
	if (RedirectAlertMessage) {
		return <RedirectAlertMessage message={redirectURL} setRedirect={setRedirect} />;
	}

	return <div>Alert message component is missing.</div>;
}

export default RedirectURLListener;
