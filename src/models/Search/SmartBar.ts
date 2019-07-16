export class SmartBar {
	/** This is used by the Hawksearch Preview to enable or disable Boost and Bury Rules. */
	public BoostAndBury?: boolean;
	/** This is used by the Hawksearch Preview to enable or disable Visibility Rules. */
	public ViisibilityRules?: boolean;
	/** This is used by the Hawksearch Preview to enable or disable the boost for Recommended Items. */
	public PersonalizedBoost?: boolean;
	/** This is used by the Hawksearch Preview to enable or disable the boost for Learning Search Multiplier. */
	public PopularityBoost?: boolean;
	/** This is used by the Hawksearch Preview to enable or disable Pinning Rules. */
	public ItemPin?: boolean;
	/** This is used by the Hawksearch Elastic API to filter results by date. */
	public PreviewDate?: string;
}
