export class Sorting {
	/** The sorting items. */
	public Items: SortingItem[];

	public constructor(init: Sorting) {
		Object.assign(this, init);

		this.Items = init.Items.map(i => new SortingItem(i));
	}
}

export class SortingItem {
	/** Name of the sorting option. This is the label to display to users. */
	public Label: string;
	/**
	 * The value to be used to specify the sort order once user selects it. This value is passed in the @see Request.SortBy
	 * field in the @see Request object.
	 */
	public Value: string;

	/** Indicates if this sorting option was configured to be the default. */
	public IsDefault: boolean;
	/** Indicates if this sorting option is currently being used for the current result set. */
	public Selected: boolean;

	public constructor(init: SortingItem) {
		Object.assign(this, init);
	}
}
