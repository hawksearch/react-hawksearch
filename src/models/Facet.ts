export class Facet {
	/** Unique identifier of the facet. */
	public FacetId: number;

	/** Display name of the facet. */
	public Name: string;

	/** The name of the field that is linked to this facet. */
	public Field: string;

	public FieldType: 'string' | 'range' | 'numeric' | 'search';
	public FacetType:
		| 'checkbox'
		| 'nestedcheckbox'
		| 'link'
		| 'nestedlink'
		| 'slider'
		| 'swatch'
		| 'rating'
		| 'size'
		| 'searchwithin'
		| 'recentsearches'
		| 'relatedsearches';

	public DisplayType: 'default' | 'scrolling' | 'truncating';

	/** Indicates the maximum number of facet values that are returned. */
	public MaxCount: number;

	/** Indicates the minimum number of results each facet value needs to have in order to be returned. */
	public MinHitCount: number;
}
