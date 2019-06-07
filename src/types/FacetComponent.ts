import { FacetType } from 'models/Facets/FacetType';

export interface FacetComponent {
	facetType: FacetType;
	component: React.ComponentType;
}
