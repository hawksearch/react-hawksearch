import axios from 'axios';
import { SearchRequest, SearchResult } from 'models/Search';

class HawkClient {
	private baseUrl = 'https://searchapi-dev.hawksearch.net';

	public async search(request: SearchRequest): Promise<SearchResult | null> {
		try {
			const result = await axios.post<SearchResult>(this.baseUrl + '/api/search', request);

			return result.data;
		} catch (error) {
			console.error('Search error:', error);
			return null;
		}
	}
}

export default HawkClient;
