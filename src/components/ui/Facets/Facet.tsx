import React, { useContext } from 'react';

import { Facet as FacetModel, Value as FacetValue } from 'models/Facets';

const FacetContext = React.createContext({} as FacetContextValue);

export interface FacetProps {
	facet: FacetModel;

	children: React.ReactNode;
}

interface FacetContextValue {
	facet: FacetModel;
}

export interface FacetActor {
	selectFacet(facetValue: FacetValue): void;
}

function Facet({ facet, children }: FacetProps) {
	return <FacetContext.Provider value={{ facet }}>{children}</FacetContext.Provider>;
}

export function useFacet() {
	return useContext(FacetContext);
}

export default Facet;
