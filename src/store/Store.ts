import { SearchResult } from 'models';
import HawkClient from 'net/HawkClient';

class Store {
	private client: HawkClient;

	public Results: SearchResult;

	constructor() {
		this.client = new HawkClient();
	}

	public async search(keyword: string) {
		console.log('doing search for:', keyword);

		const results = await this.client.search({
			ClientGuid: 'cf0025fa93fa458394abd3c3094a09ac',
			Keyword: keyword,
		});

		if (results) {
			console.log('search results:', results);
			this.Results = results;
		}
	}
}

export default Store;
