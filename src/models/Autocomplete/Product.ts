import { Result } from 'models/Search';

export class Product {
	/** Name of the item (if applicable). */
	public ProductName: string;

	/* Sku of the item (if applicable). */
	public Sku: string;

	/** URL of image of the item (if applicable). */
	public Thumb: string;

	/** URL of product page (if applicable). */
	public Url: string;

	/** HTML to display the item in autocomplete. */
	public Html: string;

	/**
	 * This will only be populated if the request parameter @see Request.DisplayFullResponse is sent
	 * as `true`.
	 */
	public Results: Result;
}
