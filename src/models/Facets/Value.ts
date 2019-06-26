export class Value {
	/** Label of the value to display. */
	public Label?: string;
	/** Value to use when setting the facet value selection. */
	public Value?: string;

	/** Number of results in current set that have this facet value. */
	public Count: number;
	/** Indicates if this facet value has been selected. */
	public Selected: boolean;

	/**
	 * Used for displaying the slider facet. @see RangeStart indicates what the starting point of the range
	 * to display, either on basis of what the user selected by sliding the slider, or if they have no
	 * selection it reflects the lowest price product.
	 */
	public RangeStart?: string;
	/**
	 * Used for displaying the slider facet. @see RangeEnd indicates what the end point of the range to
	 * display is, either on basis of what the user selected by sliding the slider, or if they have no
	 * selection, it reflects the highest price product.
	 */
	public RangeEnd?: string;

	/**
	 * Used for displaying the slider facet. @see RangeMin indicates lowest value for the range in the list
	 * of products displayed.
	 */
	public RangeMin?: string;
	/**
	 * Used for displaying the slider facet. @see RangeMax indicates highest value for the range in the list
	 * of products displayed.
	 */
	public RangeMax?: string;

	/** Used for nested facets. */
	public Path?: string;

	/** Set of pagination options */
	public Children: Value[];

	public Level: number;

	public constructor(init: Value) {
		Object.assign(this, init);
	}
}
