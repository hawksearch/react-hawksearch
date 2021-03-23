import React, { useEffect, useState } from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useHawkConfig } from 'components/ConfigProvider';
import { default as TrackingEvent } from 'components/TrackingEvent';

enum SuggestType {
	PopularSearches = 1,
	TopCategories = 2,
	TopProductMatches = 3,
	TopContentMatches = 4,
}

function getAtLeastOneExist(popular, categories, products, content) {
	const hasPopular = popular && popular.length > 0;
	const hasCategories = categories && categories.length > 0;
	const hasProducts = products && products.length > 0;
	const hasContent = content && content.length > 0;
	return hasPopular || hasCategories || hasProducts || hasContent;
}

function strip_html_tags(str: string) {
	if (str === null || str === '') {
		return '';
	} else {
		str = str.toString();
		str = str.replace(/&raquo;/g, '');
	}
	return str.replace(/<[^>]*>/g, '');
}

function getThumbUrl(item, configThumb) {
	var url = (item.Thumb && item.Thumb.Url) || configThumb;

	try {
		url = JSON.parse(url).mediaUrl;
	} catch (e) { }

	return url;
}

function ProductsComponent({
	products,
	ProductHeading,
	getItemProps,
	redirectItemDetails,
	isAtleastOneExist,
	onViewMatches,
	downshift,
	searchedKeyword,
}) {
	const {
		store: { language },
	} = useHawksearch();
	const { config } = useHawkConfig();
	const linkField = config.suggestionItem && config.suggestionItem.linkField;
	const titleField = config.suggestionItem && config.suggestionItem.titleField;
	const thumbField = config.suggestionItem && config.suggestionItem.thumbField;

	const getField = (field, item) => {
		if (language) {
			var langIndiffFields = (config.suggestionItem && config.suggestionItem.langIndiffFields && config.suggestionItem.langIndiffFields.length) ? config.suggestionItem.langIndiffFields : [];

			if (!langIndiffFields.includes(field)) {
				field += `_${language}`;
			}
		}

		if (item &&
			item.Results &&
			item.Results.Document &&
			item.Results.Document[field] &&
			item.Results.Document[field].length) {

			return item.Results.Document[field][0];
		}
	}

	return (
		<>
			{products && products.length ? (
				<ul>
					<h3>{ProductHeading}</h3>
					{products.map((item, index) => (
						<li
							{...getItemProps({
								item,
								index: `Product_${index}`,
								key: `Product_${index}`,
								onClick: () => {
									redirectItemDetails(item.Results.DocId);

									TrackingEvent.track('autocompleteclick', {
										keyword: searchedKeyword,
										suggestType: SuggestType.TopProductMatches,
										name: item.ProductName || getField(titleField, item),
										url: item.Url || getField(linkField, item),
									});
								},
							})}
						>
							{getThumbUrl(item, getField(thumbField, item)) && (
                                <div>
									<img className="hawk-sqItemImage-thumb" src={getThumbUrl(item, getField(thumbField, item))} />
                                </div>
							)}
							<span className="p-name">{item.ProductName || getField(titleField, item)}</span>
						</li>
					))}
					{isAtleastOneExist && (
						<div className="view-matches" onClick={() => onViewMatches(downshift)}>
							View all matches
						</div>
					)}
				</ul>
			) : null}
		</>
	);
}

function SuggestionList({ downshift, searchResults, onViewMatches, isLoading }) {
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

	const { actor, store } = useHawksearch();
	const [hoverKeyword, setHoverKeyword] = useState('');
	const [searchedKeyword, setSearchedKeyword] = useState('');
	const [hoverProducts, setHoverProducts] = useState([] as Array<{ Value: string; Url: string }>);

	const { getItemProps, getMenuProps, highlightedIndex, getInputProps } = downshift;
	const isAtleastOneExist = getAtLeastOneExist(popular, categories, products, content);

	function setKeyword(keyword: string) {
		setHoverKeyword(keyword);
	}

	function redirectItemDetails(id: string) {
		//browserHistory.push({
		//	pathname: `${browserHistory.location.pathname}/details`,
		//	search: `itemid=${id}`,
		//});
	}

	function searchProduct(keyword: string, typeId: number, item: { Value: string; Url: string }) {
		TrackingEvent.track('autocompleteclick', {
			keyword,
			suggestType: typeId,
			name: item.Value,
			url: item.Url,
		});
		actor.setSearch({
			PageId: undefined,
			CustomUrl: undefined,
			Keyword: strip_html_tags(item.Value),
			FacetSelections: undefined,
		});
		downshift.toggleMenu();
	}

	return (
		<ul className="dropdown-menu autosuggest-menu__list" {...getMenuProps()}>
			{isLoading && <li className="autosuggest-menu__item loading-label">Loading...</li>}
			{hoverProducts && hoverProducts.length ? (
				<ProductsComponent
					products={hoverProducts}
					ProductHeading={ProductHeading}
					getItemProps={getItemProps}
					redirectItemDetails={redirectItemDetails}
					isAtleastOneExist={isAtleastOneExist}
					onViewMatches={onViewMatches}
					downshift={downshift}
					searchedKeyword={searchedKeyword}
				/>
			) : (
					<ProductsComponent
						products={products}
						ProductHeading={ProductHeading}
						getItemProps={getItemProps}
						redirectItemDetails={redirectItemDetails}
						isAtleastOneExist={isAtleastOneExist}
						onViewMatches={onViewMatches}
						downshift={downshift}
						searchedKeyword={searchedKeyword}
					/>
				)}
			<div>
				{categories && categories.length ? (
					<>
						<h3>{CategoryHeading}</h3>
						{categories.map((item, index) => (
							<li
								key={`Category_${index}`}
								className={
									highlightedIndex === `Category_${index}`
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								onClick={() => searchProduct(searchedKeyword, SuggestType.TopCategories, item)}
								{...getInputProps({
									onMouseOver: () => {
										setKeyword(strip_html_tags(item.Value));
									},
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
								key={`Popular_${index}`}
								onClick={() => searchProduct(searchedKeyword, SuggestType.PopularSearches, item)}
								className={
									highlightedIndex === `Popular_${index}`
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								{...getInputProps({
									onMouseOver: () => {
										setKeyword(strip_html_tags(item.Value));
									},
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
								key={`Content_${index}`}
								onClick={() => searchProduct(searchedKeyword, SuggestType.TopContentMatches, item)}
								className={
									highlightedIndex === `Content_${index}`
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								{...getInputProps({
									onMouseOver: () => {
										setKeyword(strip_html_tags(item.Value));
									},
								})}
							>
								{item.Value}
							</li>
						))}
					</>
				) : null}
			</div>
		</ul>
	);
}

export default SuggestionList;
