/** An object that contains the data related to the client making search or autosuggest requests. */
export class ClientData {
	/** Unique identifier used for tracking visitors. */
	public VisitorId: string;

	public VisitId: string;

	/** Custom information used for evaluating Visitor Targets. */
	public Custom?: string;
	/** Client IP used for evaluating Visitor Targets. */
	public HttpTrueClientIp?: string;
	/** Browser user agent used for evaluating Visitor Targets. */
	public UserAgent?: string;

	public PreviewBuckets?: number[];
	/**
	 * The source used for evaluating Visitor Targets. This was previously called 'hawksource' and can
	 * be used to track the source the user came from (i.e. email, instagram, etc).
	 */
	public Source?: string;
}
