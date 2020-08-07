import * as React from 'react';
import { DownshiftProps, ControllerStateAndHelpers } from 'downshift';

declare module '@hawksearch/react-hawksearch' {
	/******************************************************************************************/
	/*                                                                                        */
	/*                                                                                        */
	/*                                     INTERFACES                                         */
	/*                                                                                        */
	/*                                                                                        */
	/******************************************************************************************/
	export interface HawksearchConfig {
		/**
		 * Optional URL of the Hawksearch API that will be used for all search and autocomplete requests. This can also
		 * be the URL of a proxy server that can act as a trusted middleware between the React frontend components and the
		 * search API.
		 *
		 * If not specified, this will default to `https://searchapi-dev.hawksearch.net`.
		 */
		apiUrl?: string;
		/**
		 * Optional URL of the Hawksearch Dashboard, that is used eg. as baseUrl for assets.
		 *
		 * If not specified, this will default to `http://test.hawksearch.net/`.
		 */
		dashboardUrl?: string;
		/**
		 * Relative URL of the endpoint call for getting results. It will use `/api/search` if not provided.
		 */
		searchUrl?: string;
		/**
		 * Relative URL of the endpoint call for autocomplete. It will use `/api/autocomplete` if not provided.
		 */
		autocompleteUrl?: string;
		/**
		 * Id of the DOM element that the search application (facets, search results) should be rendered into.
		 * This value is required when rendering the search application, and is optional if only rendering the
		 * search textbox.
		 *
		 * This value is only required when using the minified version of the library.
		 */
		searchElement?: HTMLElement | string;
		/**
		 * Id of the DOM element that the search textbox should be rendered into. If not specified, the search textbox
		 * will be rendered into the element specified by @see searchElement.
		 *
		 * This value is only used when using the minified version of the library.
		 */
		searchBoxElement?: HTMLElement | string;
		/**
		 * The public url that assets (auxilary JS files, CSS, etc) required for the library will be loaded from. This is
		 * only required when using the minified version of the library. By default this path is `"/assets/"`, so vendor JS
		 * will load from `//my.website.com/assets/auxilary-js-file.js`.
		 */
		assetPath?: string;
		/**
		 * API Client Guid. Usually comes from the "Tracking Key" in the "Account Info" section of the hawk dashboard.
		 */
		clientGuid?: string;
		/**
		 * The url of the search page for this website. Users will be redirected to this page when performing a
		 * keyword search using the standalone search box.
		 *
		 * If not specified, will default to `/search`.
		 */
		searchPageUrl?: string;
		/**
		 * The amount of milliseconds that autocomplete suggestions should be debounced. This is the delay inbetween
		 * letter presses and autocomplete triggering. If not specified, will default to 200.
		 */
		autocompleteDebounce?: number;
		/**
		 * The definition of custom autocomplete strategies that overrides default ones
		 */
		autocompleteStrategies?: any[];
		/**
		 * The definition of custom components that overrides default ones in facets rail panel
		 */
		facetOverrides?: any[];
		/**
		 * Additional flag that if set will request extended results data
		 */
		isInPreview?: boolean;
		/**
		 * IndexName if set will enable a query to a specific index in the search API
		 */
		indexName?: string;
		/**
		 * It will compare the properties of two or more items
		 */
		compareItemsURL?: string;
		/* * IndexName if set will enable a query to a specific index in the search API
		 */
		indexNameRequired?: boolean | false;
	}

	export class ClientData {
		/** Unique identifier used for tracking visitors. */
		public VisitorId: string;
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
	}

	export interface FacetSelections {
		[key: string]: string[] | undefined;
	}
	/** Represents parts of the browser query string that are fixed and are always single strings. */
	interface ParsedQueryStringFixed {
		keyword?: string;
		sort?: string;
		pg?: string;
		lp?: string;
		PageId?: string;
		lpurl?: string;
		mpp?: string;
		searchWithin?: string;
		is100Coverage?: string;
		indexName?: string;
	}
	/**
	 * Represents the parts of the browser query string that are dynamic (the selected facets). Facets
	 * can have multiple values, so the value of these is always an array of strings.
	 */
	interface ParsedQueryStringDynamic {
		[key: string]: string[];
	}
	type ParsedQueryString = ParsedQueryStringFixed & ParsedQueryStringDynamic;
	export interface HawksearchProps {
		/** Global configuration. */
		config: HawksearchConfig;
		/** The initial search to perform when initializing the search components. */
		initialSearch?: Partial<Request>;
		children: React.ReactNode;
	}

	export interface CustomSuggestionListProps {
		downshift: DownshiftProps<object>;
		searchResults: any;
		onViewMatches: (downshift: ControllerStateAndHelpers<any>) => void;
		isLoading: boolean;
	}

	interface SearchBoxProps {
		SuggestionList?: React.ComponentType<CustomSuggestionListProps>;
	}

	export class Result {
		/** Unique identifier for this search result item. */
		public DocId: string;

		/** Calculated relevancy score. */
		public Score: number;

		/**
		 * Contains the fields for the search result item, as an object of string keys to an array
		 * of string values. The keys correspond to the name of the field within the hawk dashboard,
		 * and the value of the map is an array of strings for each of the values for that field.
		 */
		public Document?: { [field: string]: string[] };

		public Explain?: any;

		public IsPin: boolean;

		public BestFragment: string;
		/**
		 * Returns a single document value, by the given field name. If the field does not exist in
		 * the document, or has no values, then `undefined` is returned instead.
		 * @param field The field within the result document to retrieve the value of.
		 */
		public getDocumentValue(field: string): string | undefined {
			if (this.Document) {
				const values = this.Document[field];

				if (values && values.length > 0) {
					return values[0];
				}
			}

			return undefined;
		}

		public constructor(init: Result) {
			Object.assign(this, init);
		}
	}

	export enum ContentType {
		Image = 'image',
		Widget = 'widget',
		Featured = 'featured',
		Custom = 'custom',
		LandingPage = 'landingPage',
	}

	export class Rule {
		public RuleType: RuleType;
		public Field: string;
		public FieldName: string;
		public FieldValue: string;
		public Condition: string;
		public Value: string;
		public Operator: RuleOperatorType;

		public Rules: Rule[];
		public Parent: Rule;
		public constructor(init: Rule) {
			Object.assign(this, init);
			if (init.Parent) {
				this.Parent = new Rule(init.Parent);
			}
			this.Rules = init.Rules ? init.Rules.map(i => new Rule(i)) : [];
		}
	}

	export enum RuleType {
		Group = 0,
		Eval = 1,
	}

	export enum RuleOperatorType {
		All = 0,
		Any = 1,
		None = 2,
	}

	export class BannerTrigger {
		public BannerGroupId: number;
		public Name: string;
		public SortOrder: number;
		public Rule: Rule;

		public constructor(init: BannerTrigger) {
			Object.assign(this, init);

			this.Rule = new Rule(this.Rule);
		}
	}

	export class FeaturedItems {
		public Items: FeaturedItem[];

		public constructor(init: FeaturedItems) {
			Object.assign(this, init);
			if (init && init.Items) {
				this.Items = init.Items.map(i => new FeaturedItem(i));
			}
		}
	}

	export class Merchandising {
		public Items: MerchandisingItem[];

		public constructor(init: Merchandising) {
			Object.assign(this, init);
			if (init && init.Items) {
				this.Items = init.Items.map(i => new MerchandisingItem(i));
			}
		}
	}

	export class PageContentItem {
		public Zone: string;
		public ContentType: ContentType;
		public ImageUrl: string;
		public ImageTitle: string;
		public AltTag: string;
		public ForwardUrl: string;
		public Output: any;
		public WidgetArgs: string;
		public Title: string;
		public Name: string;
		public DateFrom: string;
		public DateTo: string;
		public IsMobile: boolean;
		public MobileContentType: string;
		public MobileImageUrl: string;
		public MobileOutput: string;
		public MobileWidgetArgs: string;
		public IsTrackingEnabled: boolean;
		public MobileIsTrackingEnabled?: boolean;
		public FeaturedItems: Result[];
		public Items: Result[];
		public Target: string;
		public MobileTarget: string;
		public MobileAltTag: string;
		public MobileForwardUrl: string;
		public MobileWidth: string;
		public MobileHeight: string;
		public Trigger: BannerTrigger;

		public constructor(init: PageContentItem) {
			Object.assign(this, init);
			if (init.FeaturedItems) {
				this.FeaturedItems = init.FeaturedItems.map(i => new Result(i));
			}
			if (init.Trigger) {
				this.Trigger = new BannerTrigger(init.Trigger);
			}
		}
	}

	export class FeaturedItem extends PageContentItem {
		public Items: Result[];

		public constructor(init: FeaturedItem) {
			super(init);
			Object.assign(this, init);
			this.Items = init.Items.map(i => new Result(i));
		}
	}

	export class MerchandisingItem extends PageContentItem {
		public constructor(init: MerchandisingItem) {
			super(init);
			Object.assign(this, init);
		}
	}

	export class PageContent {
		public ZoneName: string;
		public Items: PageContentItem[];
		public constructor(init: PageContent) {
			Object.assign(this, init);
			this.Items = init.Items.map(i => new PageContentItem(i));
		}
	}

	export interface ResultItemProps {
		item: Result;
		websiteUrl?: string;
		itemTitleFieldName?: string;
		imageUrlFieldName?: string;
	}

	export interface ResultsListingProps {
		ResultItem: React.ComponentType<ResultItemProps>;
	}

	export class Value {
		/** Label of the value to display. */
		public Label?: string;
		/** Value to use when setting the facet value selection. */
		public Value?: string;
		/** Number of results in current set that have this facet value. */
		public Count: number;
		/** Indicates if this facet value has been selected. */
		public Selected: boolean;
		/**
		 * Used for displaying the slider facet. @see RangeStart indicates what the starting point of the range
		 * to display, either on basis of what the user selected by sliding the slider, or if they have no
		 * selection it reflects the lowest price product.
		 */
		public RangeStart?: string;
		/**
		 * Used for displaying the slider facet. @see RangeEnd indicates what the end point of the range to
		 * display is, either on basis of what the user selected by sliding the slider, or if they have no
		 * selection, it reflects the highest price product.
		 */
		public RangeEnd?: string;

		/**
		 * Used for displaying the slider facet. @see RangeMin indicates lowest value for the range in the list
		 * of products displayed.
		 */
		public RangeMin?: string;
		/**
		 * Used for displaying the slider facet. @see RangeMax indicates highest value for the range in the list
		 * of products displayed.
		 */
		public RangeMax?: string;

		/** Used for nested facets. */
		public Path?: string;

		/** Set of pagination options */
		public Children: Value[];

		public Level: number;

		public constructor(init: Value) {
			Object.assign(this, init);
		}
	}

	export class Swatch {
		/** Match this value to the @see Value object in the @see Values array of @see Facet. */
		public Value: string;

		/** Name of the asset. */
		public AssetName: string;
		/** URL of the asset. */
		public AssetUrl: string;

		/** Indicates if value is the default. */
		public IsDefault: boolean;

		/** Color of the asset. */
		public Color: string;

		public constructor(init: Swatch) {
			Object.assign(this, init);
		}
	}

	export class Range {
		/** Label of the value to display. */
		public Label: string;
		/** Value to use when setting the facet value selection. */
		public Value: string;

		/** Indicates if the values are numeric. */
		public IsNumeric: boolean;

		/** Lower value of the range. */
		public LBound: string;
		/** Upper value of the range. */
		public UBound: string;
		/** Asset Url */
		public AssetFullUrl: string;

		public constructor(init: Range) {
			Object.assign(this, init);
		}
	}

	export enum FacetType {
		Checkbox = 'checkbox',
		NestedCheckbox = 'nestedcheckbox',
		Link = 'link',
		Nestedlink = 'nestedlink',
		Slider = 'slider',
		Swatch = 'swatch',
		Rating = 'rating',
		Size = 'size',
		SearchWithin = 'search',
		RecentSearches = 'recentsearches',
		RelatedSearches = 'relatedsearches',
		OpenRange = 'openRange',
	}

	export class Facet {
		/** Unique identifier of the facet. */
		public FacetId: number;

		/** Display name of the facet. */
		public Name: string;

		/** The name of the field that is linked to this facet. */
		public Field: string;

		public FieldType: 'string' | 'range' | 'numeric' | 'search' | 'tab';
		public FacetType: FacetType;

		public DisplayType: 'default' | 'scrolling' | 'truncating';

		/** Indicates the maximum number of facet values that are returned. */
		public MaxCount: number;

		/** Indicates the minimum number of results each facet value needs to have in order to be returned. */
		public MinHitCount: number;

		/**
		 * If this is set, it is to be used as the facet name if passed in the `FacetSelections`. If not set,
		 * the value of the Field object would be used. (This is only applicable when a slider and range
		 * facets are both configured for the same field.)
		 */
		public ParamName?: string;

		/**
		 * Indicates the sorting logic that is used for this facet’s values. The possible values for this
		 * are the parameters for sorting set options that are configured in "Workbench > Data Configuration
		 * > Sorting/Pagination".
		 */
		public SortBy: string;

		/** Indicates if the user should be able to apply more than one filter value from this facet. */
		public ExpandSelection: boolean;

		/** Indicates if facet values are numeric. */
		public IsNumeric: boolean;
		/** Indicates if facet values are currency (and should be displayed appropriately). */
		public IsCurrency: boolean;
		/** Indicates currency symbol in case of currency type facets */
		public CurrencySymbol: string;
		/** Indicates if the facet can be collapsed and expanded by the user. */
		public IsCollapsible: boolean;
		/** If @see IsCollapsible is `true`, this indicates if the facet should initially be collapsed or expanded. */
		public IsCollapsedDefault: boolean;
		/** Indicates if the facet is set to be visible. */
		public IsVisible: boolean;
		/**
		 * Indicates if search is enabled for this facet. If it is enabled, a search box should be available for
		 * users to filter the facet values by typing in the search box.
		 */
		public IsSearch: boolean;

		/**
		 * If facet display type is Scrolling, this value is the height in pixels for the window inside scroll box.
		 * Only to be used if @see DisplayType is `"scrolling"`.
		 */
		public ScrollHeight: number;
		/**
		 * If the number of facet values exceeds this number and @see DisplayType is `"scrolling"`, then the facet
		 * should be displayed as scrolling list; if not, display as `"default"`.
		 */
		public ScrollThreshold: number;
		/**
		 * If the number of facet values exceeds this number and @see DisplayType is `"truncate"`, then the facet
		 * should be displayed as truncated list; if not, display as `"default"`.
		 */
		public TruncateThreshold: number;
		/**
		 * To be used if @see IsSearch is `true`. The number of facet values must be this number or higher for the
		 * facet search box to display.
		 */
		public SearchThreshold: number;

		/** Text to display when user hovers over a help icon. */
		public Tooltip?: string;

		/**
		 * If `false`, indicates that sometimes this facet will not be returned. The conditions that trigger its
		 * display are maintained in the Workbench.
		 */
		public AlwaysVisible: boolean;

		/**
		 * The display order of the facet in the facet list.
		 */
		public SortOrder: number;

		/** This is maximum number of values that could be returned for the facet. */
		public NofVisible: number;

		/** Will be included if @see FacetType is `"swatch"`. */
		public SwatchData: Swatch[];

		/** Indicates type of facet range display. */
		public FacetRangeDisplayType: number;

		/** Indicates if setting in Workbench is set to On or Off. */
		public PreloadChildren: boolean;

		/**
		 * To be used if @see FacetType is `"slider"`. If @see ShowSliderInputs is `true`, input boxes should be
		 * available for user to enter values.
		 */
		public ShowSliderInputs: boolean;

		/** Always present, but will only be populated if the facet is numeric and not a slider. */
		public Ranges: Range[];
		/** The values for this facet. */
		public Values: Value[];

		/** Whether or not the facet should be rendered as truncated. */
		public get shouldTruncate() {
			// the facet does truncated listing of values if configured for truncating and we have too many facets
			return this.DisplayType === 'truncating' && this.Values.length > this.TruncateThreshold;
		}
		/** Whether or not the facet should have a quick lookup search input. */
		public get shouldSearch() {
			// the facet should have a search box if configured to do so, and the number of facet values is greater
			// than the threshold
			return this.IsSearch && this.Values.length > this.SearchThreshold;
		}

		/**
		 * Returns the name of the key when using this facet for a selection. This will take into consideration
		 * @see ParamName and @see Field in determining which value should be returned.
		 */
		public get selectionField() {
			return this.ParamName ? this.ParamName : this.Field;
		}

		public constructor(init: Facet) {
			Object.assign(this, init);

			this.SwatchData = init.SwatchData.map(s => new Swatch(s));
			this.Ranges = init.Ranges.map(r => new Range(r));
			this.Values = init.Values.map(v => new Value(v));
		}
	}

	export interface SpinnerProps {
		isVisible: boolean;
	}

	interface CompareItemProps {
		itemsList: Result[];
		onSelectCompareItems: () => void;
		clearItems: () => void;
		onSelectTiles: (item: Result) => void;
	}

	/******************************************************************************************/
	/*                                                                                        */
	/*                                                                                        */
	/*                                     COMPONENTS                                         */
	/*                                                                                        */
	/*                                                                                        */
	/******************************************************************************************/

	export const Hawksearch: React.SFC<HawksearchProps>;
	export const SearchBox: React.SFC<>;
	export const PlaceholderItem: React.SFC;
	export const QueryStringListener: React.SFC;
	export const ResultImage: React.SFC<ResultItemProps>;
	export const FacetRail: React.SFC;
	export const FacetList: React.SFC;
	export const ToolRow: React.SFC;
	export const ResultListing: React.SFC<ResultsListingProps>;
	export const Selections: React.SFC;
	export const SearchResultsLabel: React.SFC;
	export const AutoCorrectSuggestion: React.SFC;
	export const Sorting: React.SFC;
	export const Pagination: React.SFC;
	export const PlaceholderItem: React.SFC;
	export const Spinner: React.SFC<SpinnerProps>;
	export const CompareItems:React.SFC<CompareItemProps>;

	/******************************************************************************************/
	/*                                                                                        */
	/*                                                                                        */
	/*                                        Hooks                                           */
	/*                                                                                        */
	/*                                                                                        */
	/******************************************************************************************/
	export const useHawksearch: () => React.Context;
	export const useFacet: () => React.Context;

	/******************************************************************************************/
	/*                                                                                        */
	/*                                                                                        */
	/*                                        Utils                                           */
	/*                                                                                        */
	/*                                                                                        */
	/******************************************************************************************/
	export const parseLocation: (location: any, searchUrl?: string) => Partial<Request>;
	export const parseQueryStringToObject: (search: string) => {};
	export const parseSearchQueryString: (search: string) => Partial<Request>;
	export const checkIfUrlRefsLandingPage: (path: string, searchUrl: string) => boolean;
	export const getSearchQueryString: (queryObj: ParsedQueryString) => string;
}
