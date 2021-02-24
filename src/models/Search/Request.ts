import { ClientData } from './ClientData';
import { SmartBar } from './SmartBar';

export class Request {
	/**
	 * API Client Guid. Usually comes from the "Tracking Key" in the "Account Info" section of the hawk dashboard.
	 */
	public ClientGuid: string;

	/**
	 * Search term entered by a user. If keyword is not included, all items configured to be returned will be
	 * returned. When this parameter is populated, the results will be matched against this term by the search
	 * engine.
	 */
	public Keyword?: string;

	/**
	 * Landing page Custom URL. When this parameter is populated, the resulting response will be determined by
	 * the configuration of the corresponding Landing Page.
	 */
	public CustomUrl?: string;

	/**
	 * Page number of results to return. If no PageNo value is sent, the default is that the first page of
	 * results will be returned. Reporting is impacted by sending the PageNo parameter, so it should not be
	 * passed for the first page unless the user is navigating back to the first page after visiting another
	 * page of results.
	 */
	public PageNo?: number;
	/**
	 * Maximum number of items to be returned on a page. This value needs to be one of the values configured
	 * within the Sorting/Pagination section of the Workbench. If no MaxPerPage value is sent, the default
	 * value from the Workbench will be used. The default can vary depending on the pagination set triggered.
	 */
	public MaxPerPage?: number;

	/**
	 * The SortBy value corresponds with the Sorting configuration in the Hawksearch Workbench. This value
	 * needs to be one of the values configured within the Sorting/Pagination section of the Workbench. If
	 * no SortBy value is sent, the default value from the Workbench will be used. The default can vary
	 * depending on the sorting set triggered.
	 */
	public SortBy?: string;

	/**
	 * SearchWithin should be populated if the user has applied a Search Within filter to the results. This
	 * functionality needs to be configured in the Hawksearch Workbench in order for it to work.
	 */
	public SearchWithin?: string;

	/**
	 * This is the dictionary of key-value pairs where the key is the name of the facet. The value is the array
	 * of values for the selection.
	 */
	public FacetSelections?: FacetSelections;

	/**
	 * An array of facet names that should be returned in the response. If provided, only the facets listed will
	 * be returned. If no FacetOverride value is sent, the Workbench configuration will be used to determine and
	 * send appropriate facets based on result set.
	 *
	 * If there is a Display Rules on facets will still be evaluated for facets set in FacetOverride. This means
	 * that the facet will not be returned, even if set in FacetOverride, if the Display Rule condition is not
	 * met.
	 *
	 * The Is Visible flag on facets will be honored even if the facet is set in the FacetOverride. This means
	 * that a facet set to not be visible will not be returned, even if set in FacetOverride.
	 */
	public FacetOverride?: string[];

	/**
	 * An array of field names that will be returned in the response. If provided, only the fields listed will
	 * be returned. If no FieldOverride value is sent, the Workbench configuration will be used.
	 *
	 * If the Skip from Custom flag is turned “on” for a field, it will not be returned in the response, even if
	 * set in the FieldOverride parameter.
	 */
	public FieldOverride?: string[];

	/** Client data. */
	public ClientData?: ClientData;

	/**
	 * This is used by the Hawksearch Preview to set to true will display elements in a preview mode.
	 *
	 * You can use this if you desire additional score information returned.
	 */
	public IsInPreview?: boolean;

	/**
	 * This is used by the Hawksearch Preview to set 100 % facets coverage mode
	 *
	 * You can use this if you won't to hide facet values with 100 % of coverage
	 */
	public Is100CoverageTurnedOn?: boolean;
	/**
	 * This is used by the Hawksearch Preview to display the advanced explanation.
	 *
	 * You can use this if you desire additional score information returned.
	 */
	public ExplainDocId?: string;

	/**
	 * These are used by the Hawksearch Preview.
	 *
	 * These are options that can be set by the user in the Preview SmartBar. You can use this if you desire
	 * additional score information returned.
	 */
	public SmartBar?: SmartBar[];

	public PageId?: number;
	/**
	 * IndexName if set will enable a query to a specific index in the search API
	 */
	public IndexName?: string;
	/**
	 * IgnoreSpellcheck will disable the autocorrect suggestion for the request
	 */
	public IgnoreSpellcheck?: boolean;
}

export interface FacetSelections {
	[key: string]: string[] | undefined;
}
