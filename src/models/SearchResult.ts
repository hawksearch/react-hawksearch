export class SearchResult {
	public Success: boolean;

	public Pagination: any; // TODO: pagination object

	public Keyword: string;
	public AdjustedKeyword?: string;

	public Results: any[]; // TODO: results object
	public Facets: any[]; // TODO: facets object
	public Selections: any[]; // TODO: selections object

	public Sorting?: any; // TODO: sorting object

	public DidYouMean: string[];

	public Merchandising?: any[]; // TODO: merchandising object
	public FeaturedItems?: any[]; // TODO: featured items object

	public SearchDuration: number;
}
