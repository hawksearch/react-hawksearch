import { Category } from './Category';

export class Response {
	/** Number of products that would be in search results if search was executed. */
	public Count: number;
	/** Number of content items that would be in search results if search was executed.  */
	public ContentCount: number;

	/**
	 * Pairs of display values and URLs for matching category names.  The number of categories returned
	 * is configured in the Hawksearch Workbench unless overridden by the request parameters.
	 */
	public Categories: Category[];

	public Products: any[]; // TODO: products object

	/**
	 * A set of objects for each content item returned. The number returned is configured in the
	 * Hawksearch Workbench > Keyword Search > Auto-complete > Update Top Content.
	 */
	public Content: any[]; // TODO: content object

	/**
	 * A set of Value and Url for each popular search term. The definition of Popular can be defined in
	 * the Hawksearch Workbench > Keyword Search > Auto-complete > Update Popular Searches.
	 */
	public Popular: any[]; // TODO: popular object

	/** Search website URL to be used to complete links. */
	public SearchWebsiteUrl: string;

	/** The name of the parameter used to pass the keyword entered by user. */
	public KeywordField: string;

	/**
	 * Will be included in the response if there are results to display. The `CategoryHeading` contains
	 * the text to display above the list of categories to display in Autocomplete.
	 */
	public CategoryHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `ContentHeading` contains
	 * the text to display above the list of content items to display in Autocomplete.
	 */
	public ContentHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `ProductHeading` contains
	 * the text to display above the list of products to display in Autocomplete.
	 */
	public ProductHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `PopularHeading` contains
	 * the text to display above the list of popular search terms to display in Autocomplete.
	 */
	public PopularHeading?: string;

	/**
	 * Will be included in the response if there are results to display. The `ViewAllButtonLabel` contains
	 * the text to display for the link to return all results from searching with the term entered.
	 */
	public ViewAllButtonLabel?: string;
}
