import { SuggestionType, Suggestion } from './Suggestion';

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
