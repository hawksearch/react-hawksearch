import axios, { CancelToken, AxiosInstance } from 'axios';
import { Request as SearchRequest, Response as SearchResponse, Result } from 'models/Search';
import { Request as CompareItemRequest, Response as CompareDataResponse } from 'models/CompareItems';
import { Request as AutocompleteRequest, Response as AutocompleteResponse } from 'models/Autocomplete';
import { Request as PinItemRequest } from 'models/PinItems';
import { Request as ProductDetailsRequest, Response as ProductDetailsResponse } from 'models/ProductDetails';
import { Request as SortingOrderRequest } from 'models/PinItemsOrder';
import { HawksearchConfig } from 'types/HawksearchConfig';
import AuthToken from 'components/AuthToken';

class HawkClient {
	private baseUrl: string;
	private searchUrl: string;
	private dashboardUrl: string;
	private autocompleteUrl: string;
	private compareItemsURL: string;
	private refreshTokenURL: string;
	private pinItemURL: string;
	private updatePinOrderURL: string;
	private rebuildIndexURL: string;
	private productDetailsURL: string;
	private axiosInstance: AxiosInstance = axios.create();

	constructor(config: HawksearchConfig) {
		this.baseUrl = config.apiUrl || 'https://searchapi-dev.hawksearch.net';
		this.dashboardUrl = config.dashboardUrl || 'http://test.hawksearch.net/';
		this.searchUrl = config.searchUrl || '/api/v2/search';
		this.autocompleteUrl = config.autocompleteUrl || '/api/autocomplete';
		this.refreshTokenURL = config.refreshTokenURL || '/api/internal-preview/refresh-token/';
		this.pinItemURL = config.pinItemURL || '/api/pinning/set-pinning/';
		this.updatePinOrderURL = config.updatePinOrderURL || '/api/pinning/update-pin-order/';
		this.productDetailsURL = config.productDetailsURL || '/api/internal-preview/item-detail';

		this.axiosInstance.interceptors.request.use(
			conf => {
				const accessToken = AuthToken.getTokens().accessToken;
				if ((conf.url || '').indexOf('refresh-token') !== -1 || !accessToken) {
					delete conf.headers.common.Authorization;
					delete conf.headers.common.ClientGuid;
				} else {
					conf.headers.Authorization = `Bearer ${accessToken}`;
					conf.headers.ClientGuid = config.clientGuid;
				}
				return conf;
			},
			error => {
				Promise.reject(error);
			}
		);
		this.axiosInstance.interceptors.response.use(
			response => response,
			error => {
				const originalRequest = error.config;

				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					const token = AuthToken.getTokens();
					return this.axiosInstance
						.post(new URL(this.refreshTokenURL, this.baseUrl).href, {
							ClientGuid: config.clientGuid,
							Token: token.accessToken,
							RefreshToken: token.refreshToken,
						})
						.then(res => {
							if (res.status === 200) {
								AuthToken.setTokens(res.data.Token, res.data.RefreshToken);
								this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + res.data.Token;
								return this.axiosInstance(originalRequest);
							}
							return;
						});
				}
				return Promise.reject(error);
			}
		);
		this.compareItemsURL = config.compareItemsURL || '/api/compare';
	}

	public async pinItem(request: PinItemRequest, cancellationToken?: CancelToken): Promise<any> {
		const result = await this.axiosInstance.post<any>(new URL(this.pinItemURL, this.baseUrl).href, request, {
			cancelToken: cancellationToken,
		});
		return result.data;
	}

	public async updatePinOrder(request: SortingOrderRequest, cancellationToken?: CancelToken): Promise<any> {
		const result = await this.axiosInstance.post<any>(new URL(this.updatePinOrderURL, this.baseUrl).href, request, {
			cancelToken: cancellationToken,
		});
		return result.data;
	}

	public async search(request: SearchRequest, cancellationToken?: CancelToken): Promise<SearchResponse> {
		const result = await this.axiosInstance.post<SearchResponse>(
			new URL(this.searchUrl, this.baseUrl).href,
			request,
			{
				cancelToken: cancellationToken,
			}
		);
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

	public async getProductDetails(
		request: ProductDetailsRequest,
		cancellationToken?: CancelToken
	): Promise<ProductDetailsResponse> {
		const result = await axios.post<Result>(new URL(this.productDetailsURL, this.baseUrl).href, request, {
			cancelToken: cancellationToken,
		});
		return new Result(result.data);
	}
}

export default HawkClient;
