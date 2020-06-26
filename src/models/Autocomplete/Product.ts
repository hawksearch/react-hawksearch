import { Result } from 'models/Search';
import { Suggestion, SuggestionStrategy, SuggestionType } from './Suggestion';
import { ControllerStateAndHelpers } from 'downshift';
import { useHawksearch } from 'components/StoreProvider';

export class Product extends Suggestion {
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

	public constructor(init: Product) {
		super(SuggestionType.Product);
		Object.assign(this, init);
	}
}

export class ProductStrategy implements SuggestionStrategy {
	public handleItemChange(item: Product, downshift: ControllerStateAndHelpers<Product>): void {
		location.assign(item.Url);
	}

	public toString(item: Product): string {
		return this ? item.ProductName : '';
	}
}
