export class CompareDataResult {
	/** Unique identifier for this search result item. */
	public DocId: string;

	/** Calculated relevancy score. */
	public Score: number;

	/**
	 * Contains the fields for the search result item, as an object of string keys to an array
	 * of string values. The keys correspond to the name of the field within the hawk dashboard,
	 * and the value of the map is an array of strings for each of the values for that field.
	 */
	public Document: { [field: string]: { value: string[]; compare: boolean } };

	public getDocumentValueCompare(field: string): string | undefined {
		if (this.Document) {
			const fieldObject = this.Document[field];

			if (fieldObject && fieldObject.value.length > 0) {
				return fieldObject.value[0];
			}
		}

		return undefined;
	}

	public constructor(init: CompareDataResult) {
		Object.assign(this, init);
	}
}

export class Response extends CompareDataResult {
	public Results: CompareDataResult[];

	public constructor(init: Response) {
		super(init);
	}
}
