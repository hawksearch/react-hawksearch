export class Selection {
	[field: string]: SelectionFacet;
}

export class SelectionFacet {
	/** Display name for facet. */
	public Label: string;

	/** Will contain an entry for each selection made within the facet. */
	public Items: SelectionFacetValue[];
}

export class SelectionFacetValue {
	/** Display label for facet value. */
	public Label: string;
	/** Value for facet value. */
	public Value: string;
}
