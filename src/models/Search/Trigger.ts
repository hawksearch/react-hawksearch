import { Rule } from './Rule';

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
