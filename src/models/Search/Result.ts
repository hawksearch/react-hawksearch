export class Result {
	/** Unique identifier for this search result item. */
	public DocId: string;

	/** Calculated relevancy score. */
	public Score: number;

	/**
	 * Contains the fields for the search result item, as a @see Map of string keys and an array
	 * of string values. The keys correspond to the name of the field within the hawk dashboard,
	 * and the value of the map is an array of strings for each of the values for that field.
	 */
	public Document: { [key: string]: string[] };
}
