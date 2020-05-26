import { ClientData } from 'models/Search';

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
	 * This is used by the Hawksearch Preview to set to true will display elements in a preview mode.
	 *
	 * You can use this if you desire additional score information returned.
	 */
	public IsInPreview?: boolean;

	public Type?: 'Category' | 'Product' | 'Content' | 'Popular';

	/** The maximum number of results to return for selected @see Type */
	public ProductCount?: number;

	/** Flag set to true will display also full Document object from Elastic for Products and Content suggestions. */
	public DisplayFullResponse?: boolean;

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

	public IndexName?: string;
}
