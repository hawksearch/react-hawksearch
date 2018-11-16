export class SearchRequest {
	/**
	 * API Client Guid. Usually comes from the "Tracking Key" in the "Account Info" section of the hawk dashboard.
	 */
	public ClientGuid: string;

	public Keyword?: string;

	public CustomUrl?: string;
	public PageNo?: number;
	public MaxPerPage?: number;
	public SortBy?: string;
	public SearchWithin?: string;
	public FacetSelections?: Map<string, any[]>; // TODO: array of facet objects
	public FacetOverride?: string[];
	public FieldOverride?: string[];
	public ClientData?: any; // TODO: client data object
	public IsInPreview?: boolean;
	public ExplainDocId?: string;
	public SmartBar?: any[]; // TODO: smart bar objects
}
