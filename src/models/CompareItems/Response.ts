import { Result } from 'models/Search';

export class CompareDataResult extends Result {
	public getDocumentValueCompare(field: string): string | undefined {
		if (this.Document) {
			const values = this.Document[field];

			if (values && (values as any).value.length > 0) {
				return (values as any).value[0];
			}
		}

		return undefined;
	}
	public constructor(init: CompareDataResult) {
		super(init);
	}
}
export class Response extends Result {
	public Results: CompareDataResult[];

	public constructor(init: Response) {
		super(init);
	}
}
