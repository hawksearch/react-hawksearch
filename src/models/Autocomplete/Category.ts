import { Suggestion, SuggestionType } from './Suggestion';

export class Category extends Suggestion {
	/** Display name of category (example: Men &raquo; Jackets). */
	public Value: string;
	/**
	 * URL for displaying contents of the category, ex:
	 * http://dev.hawksearch.net/sites/elasticdemo?department_nest=Jackets_4
	 */
	public Url: string;

	public constructor(init: Category) {
		super(SuggestionType.Category);
		Object.assign(this, init);
	}
}
