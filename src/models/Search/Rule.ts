export class Rule {
	public RuleType: RuleType;
	public Field: string;
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
