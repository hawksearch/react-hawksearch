import { Result } from './Result';
import { Facet } from './Facets/Facet';

export class SearchResult {
	public Success: boolean;

	public Pagination: any; // TODO: pagination object

	public Keyword: string;
	public AdjustedKeyword?: string;

	public Results: Result[]; // TODO: results object
	public Facets: Facet[]; // TODO: facets object
	public Selections: any[]; // TODO: selections object

	public Sorting?: any; // TODO: sorting object

	public DidYouMean: string[];

	public Merchandising?: any[]; // TODO: merchandising object
	public FeaturedItems?: any[]; // TODO: featured items object

	public SearchDuration: number;
}
