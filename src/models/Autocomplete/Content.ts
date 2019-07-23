import { Result } from 'models/Search';
import { SuggestionType, Suggestion } from './Suggestion';

export class Content extends Suggestion {
	/** Display label for the content item in Autocomplete. */
	public Value: string;

	/** The URL for the link created. */
	public Url: string;

	/** The display label in HTML format, if applicable. */
	public Html: string;

	public Results: Result;

	public constructor(init: Content) {
		super(SuggestionType.Content);
		Object.assign(this, init);
	}
}
