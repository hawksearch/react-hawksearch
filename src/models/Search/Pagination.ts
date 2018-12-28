export class Pagination {
	/** Number of total items in the result set. */
	public NofResults: number;

	/** The page number returned. */
	public CurrentPage: number;

	/** The number of items returned for the page. */
	public MaxPerPage: number;

	/** The total number of pages for the result set - with the current @see MaxPerPage. */
	public NofPages: number;

	/** Set of pagination options */
	public Items: PaginationItem[];

	public constructor(init: Pagination) {
		Object.assign(this, init);

		this.Items = init.Items.map(i => new PaginationItem(i));
	}
}

export class PaginationItem {
	/** Display label for user's pagination option (i.e. 24 per page). */
	public Label: string;
	/** The maximum number of items that will be returned per page when this option is selected. */
	public PageSize: number;

	/** Indicates if this is the option selected. Only one pagination item will have this set to `true`. */
	public Selected: boolean;

	/** Indicates if this is the default option. Only one pagination item will have this set to `true`. */
	public Default: boolean;

	public constructor(init: PaginationItem) {
		Object.assign(this, init);
	}
}
