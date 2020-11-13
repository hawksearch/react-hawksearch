import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { Response, Product, Popular, Category, Content } from 'models/Autocomplete';
import { Suggestion } from '../../../models/Autocomplete/Suggestion';
import { CustomSuggestionListProps } from 'models/Autocomplete/CustomSuggestionList';

export interface SearchSuggestionsListProps {
	isLoading: boolean;
	searchResults: Response;
	downshift: ControllerStateAndHelpers<Suggestion>;
	onViewMatches: (downshift: ControllerStateAndHelpers<Suggestion>) => void;
	SuggestionList?: React.ComponentType<CustomSuggestionListProps>;
}

function hasAllEmpty(popular: Popular[], categories: Category[], products: Product[], content: Content[]) {
	const hasPopular = popular && popular.length === 0;
	const hasCategories = categories && categories.length === 0;
	const hasProducts = products && products.length === 0;
	const hasContent = content && content.length === 0;
	return hasPopular && hasCategories && hasProducts && hasContent;
}

function SearchSuggestionsList({
	isLoading,
	searchResults,
	downshift,
	onViewMatches,
	SuggestionList,
}: SearchSuggestionsListProps) {
	const { Popular: popular, Categories: categories, Products: products, Content: content } = searchResults;

	const isRecordEmpty = hasAllEmpty(popular, categories, products, content);

	if (isRecordEmpty) {
		return null;
	}
	return SuggestionList ? (
		<SuggestionList
			isLoading={isLoading}
			downshift={downshift}
			searchResults={searchResults}
			onViewMatches={onViewMatches}
		/>
	) : null;
}

export default SearchSuggestionsList;
