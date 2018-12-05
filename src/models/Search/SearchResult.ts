import { Pagination } from './Pagination';
import { Result } from './Result';
import { Sorting } from './Sorting';
import { Facet } from 'models/Facets';

export class SearchResult {
	/** Indicates if request was successful. */
	public Success: boolean;

	/** Summary of pagination details and a set of pagination options. */
	public Pagination: Pagination;

	/**
	 * The Keyword value that was sent to Hawksearch in the request. If no Keyword was set in the
	 * request, the value will be empty.
	 */
	public Keyword: string;

	/**
	 * If this is populated, it indicates that the Keyword value returned 0 results, but the results
	 * in this response are from this AdjustedKeyword.  A message should be displayed to the user
	 * informing them that their search was corrected to this string.
	 *
	 * This is the result of Auto Correct, which is configured in the Workbench > Keyword Search >
	 * Did You Mean.
	 */
	public AdjustedKeyword?: string;

	/** An entry in the array for each item returned in search results. */
	public Results: Result[];

	public Facets: Facet[];

	/**
	 * Will contain an entry for each facet that has one or more selections. Will be empty if no facet
	 * selections have been made.
	 */
	public Selections: Selection[];

	public Sorting?: Sorting;

	/**
	 * If any strings are returned in the array, they should be displayed to the user as suggested
	 * search terms.
	 *
	 * This is the result of Did You Mean, which is configured in the Workbench > Keyword Search >
	 * Did You Mean.
	 */
	public DidYouMean: string[];

	/**
	 * Merchandising can be placed by using Campaigns in the Hawksearch Workbench. The Campaign will
	 * determine if the content should appear and in what zone.
	 */
	public Merchandising?: any[]; // TODO: merchandising object
	public FeaturedItems?: any[]; // TODO: featured items object

	public SearchDuration: number;
}
