import { Pagination } from './Pagination';
import { Result } from './Result';
import { Sorting } from './Sorting';
import { Selections } from './Selections';
import { Facet } from 'models/Facets';
import { Merchandising, FeaturedItems } from './Merchandising';
import { StringLiteral } from '@babel/types';
import { PageContent } from './PageContent';

export class Response {
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
	public Selections: Selections;

	public Sorting: Sorting;

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
	public Merchandising: Merchandising; // TODO: merchandising object
	public FeaturedItems: FeaturedItems; // TODO: featured items object

	public SearchDuration: number;

	public DocExplain?: string;

	/**
	 * Properties that gets populated when user requests landing page related results
	 *
	 */

	public Breadcrumb: string;

	public CustomHtml: string;

	public HeaderTitle: string;

	public MetaDescription: string;

	public MetaKeywords: string;
	public MetaRobots: string;
	public Name: string;
	public Next: string;
	public Prev: string;
	public PageHeading: string;
	public PageContent: PageContent[];
	public RelCanonical: string;
	public PageLayoutId: number;
	public TrackingId: string;
	public VisitorTargets: Array<{ Id: number; Name: string }>;
	public Redirect: { Location?: string; Target?: string };

	// end of landing page related fields
	public constructor(init: Response) {
		Object.assign(this, init);

		this.Pagination = new Pagination(init.Pagination);
		this.Merchandising = new Merchandising(init.Merchandising);
		this.FeaturedItems = new FeaturedItems(init.FeaturedItems);
		this.Results = init.Results.map(r => new Result(r));
		this.Facets = init.Facets.map(f => new Facet(f));
		this.PageContent = init.PageContent ? init.PageContent.map(p => new PageContent(p)) : [];
		this.Selections = new Selections(init.Selections);
		this.Sorting = new Sorting(init.Sorting);
	}
}
