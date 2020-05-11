import { Result } from 'models/Search';

export class CompareDataResponse {
	public Results: Result[];

	public constructor(init: CompareDataResponse) {
		Object.assign(this, init);
	}
}
