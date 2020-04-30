import { Explain } from './Explain';

export class Result {
	/** Unique identifier for this search result item. */
	public DocId: string;

	/** Calculated relevancy score. */
	public Score: number;

	/**
	 * Contains the fields for the search result item, as an object of string keys to an array
	 * of string values. The keys correspond to the name of the field within the hawk dashboard,
	 * and the value of the map is an array of strings for each of the values for that field.
	 */
	public Document?: { [field: string]: string[] };

	public Explain?: Explain;

	public IsPin: boolean;

	public BestFragment: string;
	/**
	 * Returns a single document value, by the given field name. If the field does not exist in
	 * the document, or has no values, then `undefined` is returned instead.
	 * @param field The field within the result document to retrieve the value of.
	 */
	public getDocumentValue(field: string): string | undefined {
		if (this.Document) {
			const values = this.Document[field];

			if (values && values.length > 0) {
				return values[0];
			}
		}

		return undefined;
	}

	public constructor(init: Result) {
		Object.assign(this, init);
	}
}
