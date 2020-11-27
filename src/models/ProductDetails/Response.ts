import { Result } from 'models/Search';

export class Response extends Result {
	public constructor(init: Response) {
		super(init);
	}
}
