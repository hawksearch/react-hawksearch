import { Result } from 'models/Search';

export class Response {
	public Results: Result[];

	public constructor(init: Response) {
		Object.assign(this, init);
	}
}
