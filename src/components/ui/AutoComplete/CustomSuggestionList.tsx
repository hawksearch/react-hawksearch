import React,{useEffect, useState}  from 'react';
import { DownshiftProps, ControllerStateAndHelpers } from 'downshift';
import { ResponseProps } from '../../../models/Autocomplete/Response';
import { Suggestion } from '../../../models/Autocomplete/Suggestion';
import axios, { CancelToken } from 'axios';
import { AutocompleteResponse } from '../../../models/Autocomplete/AutocompleteResponse';
import TrackingEvent from '../../TrackingEvent';
import { useHawksearch } from 'components/StoreProvider';
import { useHawkConfig } from 'components/ConfigProvider';
import { history } from '../../../util/History';
import HawkClient from 'net/HawkClient';


export interface CustomSuggestionListProps {
	downshift: any;
	searchResults: AutocompleteResponse;
	onViewMatches: (downshift: ControllerStateAndHelpers<Suggestion>) => void;
	isLoading: boolean;
}

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
									redirectItemDetails(item.Results.DocId, item.Results.Document.url[0]);
									TrackingEvent.track('autocompleteclick', {
										keyword: downshift.inputValue,
										suggestType: SuggestType.TopProductMatches,
										name: item.ProductName,
										url: item.Url,
									});
								},
							})}
						>
							{item.Thumb && item.Thumb.Url && (
								<div>
									<img className="hawk-sqItemImage-thumb" src={item.Thumb.Url} />
								</div>
							)}
							<span className="p-name">{item.ProductName}</span>
						</li>
					))}
					{isAtleastOneExist && (products[0].IsRecommended === false || !products[0].IsRecommended) ? (
						<div className="view-matches" onClick={() => onViewMatches(downshift)}>
							View all matches
						</div>
					) : null}
				</ul>
			) : null}
		</>
	);
}

function CustomSuggestionList({ downshift, searchResults, onViewMatches, isLoading }: CustomSuggestionListProps) {
	const {
		Popular: popular,
		Categories: categories,
		Products: products,
		Content: content,
		DymContentSearch: dymContentSearch,
		DymProductsSearch: dymProductSearch,
		PopularHeading,
		CategoryHeading,
		ProductHeading,
		ContentHeading,
		DYMContentHeading,
		DYMProductHeading,
	} = searchResults;

	const { actor, store} = useHawksearch();
	const [hoverKeyword, setHoverKeyword] = useState('');
	const [searchedKeyword, setSearchedKeyword] = useState('');
	const [hoverProducts, setHoverProducts] = useState([] as Array<{ Value: string; Url: string }>);
	const { config } = useHawkConfig();
	const { getItemProps, getMenuProps, highlightedIndex, getInputProps } = downshift;
	const isAtleastOneExist = getAtLeastOneExist(popular, categories, products, content);
	const isSuggestionChangeEnabled = config.isSuggestionChangeEnabled;
	
	useEffect(() => {
		const cts = axios.CancelToken.source();
		if (hoverKeyword) {
			doAutocomplete(hoverKeyword, cts.token);
			
		}
		
		return () => {
			cts.cancel();
		};
	}, [hoverKeyword]);

	async function doAutocomplete(input: string, cancellationToken?: CancelToken) {
		setSearchedKeyword(input);
		const client = new HawkClient(config);
		let response: any;
		try {
			response = await client.autocomplete(
				{
					ClientGuid: config.clientGuid ? config.clientGuid : '',
					Keyword: decodeURIComponent(input),
					IndexName: config.indexName,
					DisplayFullResponse: true,
					FacetSelections: store.pendingSearch.FacetSelections,
					IsInPreview: config.isInPreview,
					PreviewDate: store.previewDate || undefined,
				},
				cancellationToken
			);
		} catch (error) {
			if (axios.isCancel(error)) {
				// if the request was cancelled, it's because this component was updated
				return;
			}

			console.error('Autocomplete request error:', error);
		}

		if (response) {
			setHoverProducts(response.Products);
		}
	}

	function setKeyword(keyword: string) {
		setHoverKeyword(keyword);
	}

	function redirectItemDetails(id: string, url: string | null) {
		const getProducts = products.find(productItem => productItem.Results.DocId === id);
		// const getContent = content.find(productItem => productItem.Results.DocId === id);
		// const getUrl = getProducts === undefined ? getContent!.Url : getProducts.Url;
		let path = id.split("?");
		let getUrlParam = window.location.pathname.split('/');
		let findUrlIndex = getUrlParam.find(param => param === path[0].slice(1));
		
		if (getProducts === undefined) {
			history.push({
				pathname: findUrlIndex === undefined ? `${window.location.pathname}${path[0]}` : window.location.pathname,
				search: `${path[1]}`
			});
		} else if (url) {
			window.location.assign(url);
		}

	}

	function redirectDYMitems(
		searchKeyword: string | '',
		typeId: number | null,
		item: { Value: string; Url: string; RawValue: string } | {}
	) {
		const getDYMproductSearch = dymProductSearch ?  dymProductSearch.find(dymProductItem => dymProductItem.Value === item) : undefined;
		getDYMproductSearch === undefined
			? searchProduct(searchKeyword, typeId, getDYMproductSearch)
			: window.location.assign(getDYMproductSearch.Url);
		downshift.toggleMenu();
	}

	function searchProduct(
		keyword: string,
		typeId: number | null,
		item: { Value?: string | undefined; Url?: string; FieldQSValue?: any ; FieldQSName?: string; RawValue?: string } | undefined
	) {
		
		TrackingEvent.track('autocompleteclick', {
			keyword,
			suggestType: typeId,
			name: item!.Value,
			url: item!.Url,
		});

		item!.FieldQSName
			? actor.setSearch({
					PageId: undefined,
					CustomUrl: undefined,
					FacetSelections: {
						[item!.FieldQSName]: [decodeURI(item!.FieldQSValue)],
					},
					Keyword: item!.RawValue,
			  })
			: actor.setSearch({
					PageId: undefined,
					CustomUrl: undefined,
					Keyword: item!.RawValue,
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
										if (isSuggestionChangeEnabled) {
											setKeyword(strip_html_tags(item.Value));
											
										}
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
										if (isSuggestionChangeEnabled) {
											setKeyword(strip_html_tags(item.Value));
										}
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
								onClick={() => {
									redirectItemDetails(item.Results.Document.url[0], item.Url) ;
									console.log('item =====>', item)
									TrackingEvent.track('autocompleteclick', {
										keyword: downshift.inputValue,
										suggestType: SuggestType.TopContentMatches,
										name: item.Value,
										url: item.Url,
									});
								}
								}
								// searchProduct(searchedKeyword, SuggestType.TopContentMatches, item);
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
				{dymProductSearch && dymProductSearch.length ? (
					<>
						<h3>{DYMProductHeading}</h3>
						{dymProductSearch.map((item, index) => (
							<li
								key={`Content_${index}`}
								onClick={() => redirectDYMitems(searchedKeyword, null, item.Value)}
								className={
									highlightedIndex === `Content_${index}`
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								// {...getInputProps({
								// 	onMouseOver: () => {
								// 		setKeyword(strip_html_tags(item.Value));
								// 	},
								// })}
							>
								{item.Value}
							</li>
						))}
					</>
				) : dymContentSearch && dymContentSearch.length ? (
					<>
						<h3>{DYMContentHeading}</h3>
						{dymContentSearch.map((item, index) => (
							<li
								key={`Content_${index}`}
								onClick={() => redirectDYMitems(searchedKeyword, null, item.Value)}
								className={
									highlightedIndex === `Content_${index}`
										? 'autosuggest-menu__item autosuggest-menu__item--highlighted'
										: 'autosuggest-menu__item'
								}
								// {...getInputProps({
								// 	onMouseOver: () => {
								// 		setKeyword(strip_html_tags(item.Value));
								// 	},
								// })}
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

export default CustomSuggestionList;
