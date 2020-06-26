import axios, { CancelToken, AxiosRequestConfig } from 'axios';
import { Request as SearchRequest, Response as SearchResponse } from 'models/Search';
import { Request as CompareItemRequest, Response as CompareDataResponse } from 'models/CompareItems';
import { Request as AutocompleteRequest, Response as AutocompleteResponse } from 'models/Autocomplete';
import { HawksearchConfig } from 'types/HawksearchConfig';

class HawkClient {
	private baseUrl: string;
	private searchUrl: string;
	private dashboardUrl: string;
	private autocompleteUrl: string;
	private compareItemsURL: string;

	constructor(config: HawksearchConfig) {
		this.baseUrl = config.apiUrl || 'https://searchapi-dev.hawksearch.net';
		this.dashboardUrl = config.dashboardUrl || 'http://test.hawksearch.net/';
		this.searchUrl = config.searchUrl || '/api/v2/search';
		this.autocompleteUrl = config.autocompleteUrl || '/api/autocomplete';
		this.compareItemsURL = config.compareItemsURL || '/api/compare';
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

	public async getComparedItems(
		request: CompareItemRequest,
		cancellationToken?: CancelToken
	): Promise<CompareDataResponse> {
		const result = await axios.post<CompareDataResponse>(
			new URL(this.compareItemsURL, this.baseUrl).href,
			request,
			{
				cancelToken: cancellationToken,
			}
		);

		return result.data;
	}
}

export default HawkClient;
