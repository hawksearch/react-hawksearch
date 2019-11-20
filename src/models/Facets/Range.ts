export class Range {
	/** Label of the value to display. */
	public Label: string;
	/** Value to use when setting the facet value selection. */
	public Value: string;

	/** Indicates if the values are numeric. */
	public IsNumeric: boolean;

	/** Lower value of the range. */
	public LBound: string;
	/** Upper value of the range. */
	public UBound: string;
	/** Asset Url */
	public AssetFullUrl: string;

	public constructor(init: Range) {
		Object.assign(this, init);
	}
}
