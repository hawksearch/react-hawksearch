import {
	Checkbox as DefaultCheckbox,
	NestedCheckbox as DefaultNestedCheckbox,
	Search as DefaultSearch,
	Link as DefaultLink,
	Slider as DefaultSlider,
	Swatch as DefaultSwatch,
	OpenRange as DefaultOpenRange,
	NestedLink as DefaultNestedLink,
} from 'components/ui/Facets/FacetTypes';
import { FacetComponent } from 'types/FacetComponent';
import { FacetType } from 'models/Facets/FacetType';
import { SuggestionStrategyMatch, SuggestionType } from 'models/Autocomplete/Suggestion';
import { ProductStrategy, CategoryStrategy, PopularStrategy, ContentStrategy } from 'models/Autocomplete';

// the default set of facet components that we support
const defaultFacetComponents: FacetComponent[] = [
	{ facetType: FacetType.Checkbox, component: DefaultCheckbox },
	{ facetType: FacetType.NestedCheckbox, component: DefaultNestedCheckbox },
	{ facetType: FacetType.SearchWithin, component: DefaultSearch },
	{ facetType: FacetType.Link, component: DefaultLink },
	{ facetType: FacetType.Slider, component: DefaultSlider },
	{ facetType: FacetType.Swatch, component: DefaultSwatch },
	{ facetType: FacetType.OpenRange, component: DefaultOpenRange },
	{ facetType: FacetType.Nestedlink, component: DefaultNestedLink },
];

const defaultAutocompleteStrategies: SuggestionStrategyMatch[] = [
	{ SuggestionType: SuggestionType.Product, SuggestionStrategy: new ProductStrategy() },
	{ SuggestionType: SuggestionType.Category, SuggestionStrategy: new CategoryStrategy() },
	{ SuggestionType: SuggestionType.Popular, SuggestionStrategy: new PopularStrategy() },
	{ SuggestionType: SuggestionType.Content, SuggestionStrategy: new ContentStrategy() },
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

/**
 * Builds a list of all supported autocomplete suggestion strategiesby also taking into consideration overridden strategies.
 */
export function getAutocompleteStrategies(overridedStrategies: SuggestionStrategyMatch[]): SuggestionStrategyMatch[] {
	const suggestionStrategies: SuggestionStrategyMatch[] = [];

	// tslint:disable-next-line:forin
	for (const key in SuggestionType) {
		const sType = SuggestionType[key];

		const autocompleteStrategy =
			// check to see if the facet is overridden
			overridedStrategies.find(strategyMatch => strategyMatch.SuggestionType === sType) ||
			// otherwise, pull from defaults
			defaultAutocompleteStrategies.find(strategyMatch => strategyMatch.SuggestionType === sType);

		if (autocompleteStrategy) {
			suggestionStrategies.push(autocompleteStrategy);
		}
	}
	return suggestionStrategies;
}
