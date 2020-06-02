import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { Response, Product, Popular, Category, Content } from 'models/Autocomplete';
import { Suggestion } from '../../../models/Autocomplete/Suggestion';
import { useTranslation } from 'react-i18next';

export interface SearchSuggestionsListProps {
	isLoading: boolean;
	searchResults: Response;
	downshift: ControllerStateAndHelpers<Suggestion>;
	onViewMatches: (downshift: ControllerStateAndHelpers<Suggestion>) => void;
}

function hasAllEmpty(popular: Popular[], categories: Category[], products: Product[], content: Content[]) {
	const hasPopular = popular && popular.length === 0;
	const hasCategories = categories && categories.length === 0;
	const hasProducts = products && products.length === 0;
	const hasContent = content && content.length === 0;
	return hasPopular && hasCategories && hasProducts && hasContent;
}

function getAtleastOneExist(popular: Popular[], categories: Category[], products: Product[], content: Content[]) {
	const hasPopular = popular && popular.length > 0;
	const hasCategories = categories && categories.length > 0;
	const hasProducts = products && products.length > 0;
	const hasContent = content && content.length > 0;
	return hasPopular || hasCategories || hasProducts || hasContent;
}

function SearchSuggestionsList({ isLoading, searchResults, downshift, onViewMatches }: SearchSuggestionsListProps) {
	const {
		Popular: popular,
		Categories: categories,
		Products: products,
		Content: content,
		PopularHeading,
		CategoryHeading,
		ProductHeading,
		ContentHeading,
	} = searchResults;
	const { getItemProps, getMenuProps, highlightedIndex } = downshift;
	const isRecordEmpty = hasAllEmpty(popular, categories, products, content);
	const isAtleastOneExist = getAtleastOneExist(popular, categories, products, content);
	const { t, i18n } = useTranslation();

	return (
		<ul className="dropdown-menu autosuggest-menu__list" {...getMenuProps()}>
			{isLoading && <li className="autosuggest-menu__item loading-label">Loading...</li>}
			{products && products.length ? (
				<ul>
					<h3>{ProductHeading}</h3>
					{products.map((item, index) => (
						<li
							className={
								highlightedIndex === parseInt(index + '11', 3)
									? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
									: 'autosuggest-menu__item'
							}
							{...getItemProps({
								item,
								index: parseInt(index + '11', 3),
								key: item.Results.DocId,
							})}
						>
							<div dangerouslySetInnerHTML={{ __html: item.Thumb }} />
							<p className="p-name">{item.ProductName}</p>
						</li>
					))}
					{isAtleastOneExist && (
						<div className="view-matches" onClick={() => onViewMatches(downshift)}>
							View all matches
						</div>
					)}
				</ul>
			) : null}
			<div>
				{categories && categories.length ? (
					<>
						<h3>{CategoryHeading}</h3>
						{categories.map((item, index) => (
							<li
								className={
									highlightedIndex === parseInt(index + '127', 3)
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								{...getItemProps({
									item,
									index: parseInt(index + '127', 3),
									key: parseInt(index + '127', 3),
								})}
							>
								<div dangerouslySetInnerHTML={{ __html: item.Value }} />
							</li>
						))}
					</>
				) : null}
				{popular && popular.length ? (
					<>
						<h3>{PopularHeading}</h3>
						{popular.map((item, index) => (
							<li
								className={
									highlightedIndex === parseInt(index + '17', 3)
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								{...getItemProps({
									item,
									index: parseInt(index + '17', 3),
									key: parseInt(index + '17', 3),
								})}
							>
								<div dangerouslySetInnerHTML={{ __html: item.Value }} />
							</li>
						))}
					</>
				) : null}
				{content && content.length ? (
					<>
						<h3>{ContentHeading}</h3>
						{content.map((item, index) => (
							<li
								className={
									highlightedIndex === parseInt(index + '18', 3)
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								{...getItemProps({
									item,
									index: parseInt(index + '18', 3),
									key: item.Results.DocId,
								})}
							>
								{item.Value}
							</li>
						))}
					</>
				) : null}
			</div>
			{!isLoading && isRecordEmpty && <li className="autosuggest-menu__item">{t('No results.')}</li>}
		</ul>
	);
}

export default SearchSuggestionsList;