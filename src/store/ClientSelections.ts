import { Facet } from 'models/Facets';

export interface ClientSelections {
	[field: string]: ClientSelection;
}

export interface ClientSelection {
	/** The facet that this selection is for. */
	facet: Facet;

	/** The display name for the facet. */
	label: string;

	items: ClientSelectionValue[];
}

export interface ClientSelectionValue {
	/** Display label for facet value. */
	label: string;

	/** Value for facet value. */
	value: string;
}
