import axios from 'axios';
import { Request as SearchRequest, Response as SearchResponse } from 'models/Search';

class HawkClient {
	private baseUrl = 'https://searchapi-dev.hawksearch.net';

	public async search(request: SearchRequest): Promise<SearchResponse | null> {
		try {
			const result = await axios.post<SearchResponse>(this.baseUrl + '/api/search', request);

			return result.data;
		} catch (error) {
			console.error('Search error:', error);
			return null;
		}
	}
}

export default HawkClient;
