export class Selections {
	[field: string]: SelectionFacet;

	public constructor(init: Selections) {
		Object.assign(this, init);

		Object.keys(init).forEach(key => {
			const selFacet = init[key];

			this[key] = new SelectionFacet(selFacet);
		});
	}
}

export class SelectionFacet {
	/** Display name for facet. */
	public Label: string;

	/** Will contain an entry for each selection made within the facet. */
	public Items: SelectionFacetValue[];

	public constructor(init: SelectionFacet) {
		Object.assign(this, init);

		this.Items = init.Items.map(i => new SelectionFacetValue(i));
	}
}

export class SelectionFacetValue {
	/** Display label for facet value. */
	public Label: string;

	/** Value for facet value. */
	public Value: string;

	public constructor(init: SelectionFacetValue) {
		Object.assign(this, init);
	}
}
