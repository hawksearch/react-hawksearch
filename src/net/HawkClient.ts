import axios from 'axios';
import { Request as SearchRequest, Response as SearchResponse } from 'models/Search';
import { Request as AutocompleteRequest, Response as AutocompleteResponse } from 'models/Autocomplete';

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

	public async autocomplete(request: AutocompleteRequest): Promise<AutocompleteResponse | null> {
		try {
			const result = await axios.post<AutocompleteResponse>(this.baseUrl + '/api/autocomplete', request);

			return result.data;
		} catch (error) {
			console.error('Autocomplete error:', error);
			return null;
		}
	}
}

export default HawkClient;
