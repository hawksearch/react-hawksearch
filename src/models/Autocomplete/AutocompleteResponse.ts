export interface AutocompleteRequest {
	ClientGuid: string;
	Keyword: string;
	IndexName: string;
	DisplayFullResponse: boolean;
	FacetSelections: { [key: string]: string[] | undefined };
	IsInPreview?: boolean;
	PreviewDate?: string;
}

export interface AutocompleteResponse {
	/** Number of products that would be in search results if search was executed. */
	Count: number;
	/** Number of content items that would be in search results if search was executed.  */
	ContentCount: number;

	/**
	 * Pairs of display values and URLs for matching category names.  The number of categories returned
	 * is configured in the Hawksearch Workbench unless overridden by the request parameters.
	 */
	Categories: Array<{
		Value: string;
		Url: string;
	}>;

	Products: Array<{
		Value: string;
		Url: string;
	}> | any;

	/**
	 * A set of objects for each content item returned. The number returned is configured in the
	 * Hawksearch Workbench > Keyword Search > Auto-complete > Update Top Content.
	 */
	Content: Array<{
		Value: string;
		Url: string;
	}>| any;

	/**
	 * A set of Value and Url for each popular search term. The definition of Popular can be defined in
	 * the Hawksearch Workbench > Keyword Search > Auto-complete > Update Popular Searches.
	 */
	Popular: Array<{
		Value: string;
		Url: string;
	}>;

	/** Search website URL to be used to complete links. */
	SearchWebsiteUrl: string;

	/** The name of the parameter used to pass the keyword entered by user. */
	KeywordField: string;

	/**
	 * Will be included in the response if there are results to display. The `CategoryHeading` contains
	 * the text to display above the list of categories to display in Autocomplete.
	 */
	CategoryHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `ContentHeading` contains
	 * the text to display above the list of content items to display in Autocomplete.
	 */
	ContentHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `ProductHeading` contains
	 * the text to display above the list of products to display in Autocomplete.
	 */
	ProductHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `PopularHeading` contains
	 * the text to display above the list of popular search terms to display in Autocomplete.
	 */
	PopularHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `ViewAllButtonLabel` contains
	 * the text to display for the link to return all results from searching with the term entered.
	 */
	ViewAllButtonLabel?: string;

	DYMContentHeading?: string;

	DYMProductHeading?: string;

	DymContentSearch?: Array<{
		RawValue: string;
		Url: string;
		Value: string;
	}>;

	DymProductsSearch?: Array<{
		RawValue: string;
		Url: string;
		Value: string;
	}>;
}
