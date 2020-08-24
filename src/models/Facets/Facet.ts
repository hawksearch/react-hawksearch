import { Value } from './Value';
import { Swatch } from './Swatch';
import { Range } from './Range';
import { FacetType } from 'models/Facets/FacetType';

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
	// Data type for datetime facet type
	public DataType?: string;

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
