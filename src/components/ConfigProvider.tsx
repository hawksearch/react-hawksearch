import React, { useContext } from 'react';

import { HawksearchConfig } from 'types/HawksearchConfig';

const ConfigContext = React.createContext({} as ConfigContextValue);

export interface ConfigContextValue {
	/** Global configuration. */
	config: HawksearchConfig;
}

export interface ConfigProviderProps {
	config: HawksearchConfig;
	children: React.ReactNode;
}

// declare webpack's constant to appease typescript
declare var __webpack_public_path__: string;

function ConfigProvider({ config, children }: ConfigProviderProps) {
	if (config.assetPath) {
		let path = config.assetPath;

		// ensure the provided path both starts and ends with a slash
		if (!path.startsWith('/')) {
			path = '/' + path;
		}
		if (!path.endsWith('/')) {
			path = path + '/';
		}

		// allow consumers to tell webpack where to load code split/lazy loaded files from, as they may not be
		// hosting our JS from /assets/ (the default path)
		__webpack_public_path__ = path;
	}

	return <ConfigContext.Provider value={{ config }}>{children}</ConfigContext.Provider>;
}

export function useHawkConfig() {
	const context = useContext(ConfigContext);

	if (!context.config) {
		throw new Error(
			'No HawksearchConfig is available, did you forget to wrap your components in a ConfigProvider component?'
		);
	}

	return context;
}

export default ConfigProvider;
