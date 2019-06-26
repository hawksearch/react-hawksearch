import {
	Checkbox as DefaultCheckbox,
	NestedCheckbox as DefaultNestedCheckbox,
	Search as DefaultSearch,
	Link as DefaultLink,
	Slider as DefaultSlider,
	Swatch as DefaultSwatch,
	OpenRange as DefaultOpenRange,
} from 'components/ui/Facets/FacetTypes';
import { FacetComponent } from 'types/FacetComponent';
import { FacetType } from 'models/Facets/FacetType';

// the default set of facet components that we support
const defaultFacetComponents: FacetComponent[] = [
	{ facetType: FacetType.Checkbox, component: DefaultCheckbox },
	{ facetType: FacetType.NestedCheckbox, component: DefaultNestedCheckbox },
	{ facetType: FacetType.SearchWithin, component: DefaultSearch },
	{ facetType: FacetType.Link, component: DefaultLink },
	{ facetType: FacetType.Slider, component: DefaultSlider },
	{ facetType: FacetType.Swatch, component: DefaultSwatch },
	{ facetType: FacetType.OpenRange, component: DefaultOpenRange },
];

/**
 * Builds a list of all supported facet components by also taking into consideration overridden components.
 */
export function getFacetComponents(overridedComponents: FacetComponent[]) {
	const facetComponents: FacetComponent[] = [];

	// tslint:disable-next-line:forin
	for (const key in FacetType) {
		const fType = FacetType[key];

		const fComponent =
			// check to see if the facet is overridden
			overridedComponents.find(component => component.facetType === fType) ||
			// otherwise, pull from defaults
			defaultFacetComponents.find(component => component.facetType === fType);

		if (fComponent) {
			facetComponents.push(fComponent);
		}
	}

	return facetComponents;
}
