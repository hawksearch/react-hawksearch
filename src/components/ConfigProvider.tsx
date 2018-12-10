import React, { useContext, useState } from 'react';

import { HawkSearchConfig } from 'HawkSearch';

const ConfigContext = React.createContext({} as ConfigContextValue);

interface ConfigContextValue {
	/** Global configuration. */
	config: HawkSearchConfig;
}

interface ConfigProviderProps {
	config: HawkSearchConfig;

	children: React.ReactNode;
}

function ConfigProvider({ config, children }: ConfigProviderProps) {
	return <ConfigContext.Provider value={{ config }}>{children}</ConfigContext.Provider>;
}

export function useHawkConfig() {
	return useContext(ConfigContext);
}

export default ConfigProvider;
