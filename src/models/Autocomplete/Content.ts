import { Result } from 'models/Search';

export class Content {
	/** Display label for the content item in Autocomplete. */
	public Value: string;

	/** The URL for the link created. */
	public Url: string;

	/** The display label in HTML format, if applicable. */
	public Html: string;

	public Results: Result;
}
