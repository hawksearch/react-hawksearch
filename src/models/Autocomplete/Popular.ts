import { SuggestionType, Suggestion, SuggestionStrategy } from './Suggestion';
import { ControllerStateAndHelpers } from 'downshift';

export class Popular extends Suggestion {
	/** Display label for the popular search term. */
	public Value: string;

	/** The URL for the link created. */
	public Url: string;

	public constructor(init: Popular) {
		super(SuggestionType.Popular);
		Object.assign(this, init);
	}
}

export class PopularStrategy implements SuggestionStrategy {
	public handleItemChange(item: Popular, downshift: ControllerStateAndHelpers<Popular>): void {
		location.assign(item.Url);
	}

	public toString(item: Popular): string {
		return this ? item.Value : '';
	}
}
