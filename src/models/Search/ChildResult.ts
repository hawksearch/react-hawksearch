/** An object that contains the data related to the client making search or autosuggest requests. */
export class ChildResult {
	/** Number of total items in the result set. */
	public NofResults: number;

	/** The page number returned. */
	public CurrentPage: number;

	/** The number of items returned for the page. */
	public MaxPerPage: number;

	/** The total number of pages for the result set - with the current @see MaxPerPage. */
	public NofPages: number;

	/** Set of pagination options */
	public Items: Array<{ [field: string]: string[] }>;

	public Sort: string;

	public constructor(init: ChildResult) {
		Object.assign(this, init);
	}

	public getHittedChildAttributeValue(field: string): string | undefined {
		if (!this.Items || this.Items.length === 0) {
			return undefined;
		}
		const values = this.Items[0];
		if (values && values[field] && values[field].length > 0) {
			return values[field][0];
		}

		return undefined;
	}
}
