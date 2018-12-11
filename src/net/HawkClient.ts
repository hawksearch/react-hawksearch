import axios, { CancelToken } from 'axios';
import { Request as SearchRequest, Response as SearchResponse } from 'models/Search';
import { Request as AutocompleteRequest, Response as AutocompleteResponse } from 'models/Autocomplete';

class HawkClient {
	private baseUrl = 'https://searchapi-dev.hawksearch.net';

	public async search(request: SearchRequest, cancellationToken?: CancelToken): Promise<SearchResponse> {
		const result = await axios.post<SearchResponse>(this.baseUrl + '/api/search', request, {
			cancelToken: cancellationToken,
		});

		return result.data;
	}

	public async autocomplete(
		request: AutocompleteRequest,
		cancellationToken?: CancelToken
	): Promise<AutocompleteResponse> {
		const result = await axios.post<AutocompleteResponse>(this.baseUrl + '/api/autocomplete', request, {
			cancelToken: cancellationToken,
		});

		return result.data;
	}
}

export default HawkClient;
