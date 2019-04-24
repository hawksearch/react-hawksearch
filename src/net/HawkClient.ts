import axios, { CancelToken } from 'axios';
import { Request as SearchRequest, Response as SearchResponse } from 'models/Search';
import { Request as AutocompleteRequest, Response as AutocompleteResponse } from 'models/Autocomplete';
import { HawkSearchConfig } from 'types/HawkSearchConfig';

class HawkClient {
	private baseUrl: string;
	private searchUrl: string;
	private autocompleteUrl: string;

	constructor(config: HawkSearchConfig) {
		this.baseUrl = config.apiUrl || 'https://searchapi-dev.hawksearch.net';
		this.searchUrl = config.searchUrl || '/api/search';
		this.autocompleteUrl = config.autocompleteUrl || '/api/autocomplete';
	}

	public async search(request: SearchRequest, cancellationToken?: CancelToken): Promise<SearchResponse> {
		const result = await axios.post<SearchResponse>(new URL(this.searchUrl, this.baseUrl).href, request, {
			cancelToken: cancellationToken,
		});

		return result.data;
	}

	public async autocomplete(
		request: AutocompleteRequest,
		cancellationToken?: CancelToken
	): Promise<AutocompleteResponse> {
		const result = await axios.post<AutocompleteResponse>(
			new URL(this.autocompleteUrl, this.baseUrl).href,
			request,
			{
				cancelToken: cancellationToken,
			}
		);

		return result.data;
	}
}

export default HawkClient;
