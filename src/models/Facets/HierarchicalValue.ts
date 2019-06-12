import { Value } from './Value';

export class HierarchicalValue extends Value {
	/** Set of pagination options */
	public Children: HierarchicalValue[];

	public Level: number;
	public ValuePath: string;
	public constructor(init: HierarchicalValue) {
		super(init);
	}
}
