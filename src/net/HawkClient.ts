import axios, { CancelToken, AxiosInstance } from 'axios';
import { Request as SearchRequest, Response as SearchResponse } from 'models/Search';
import { Request as AutocompleteRequest, Response as AutocompleteResponse } from 'models/Autocomplete';
import { HawkSearchConfig } from 'types/HawkSearchConfig';
import AuthToken from 'components/AuthToken';

class HawkClient {
	private baseUrl: string;
	private searchUrl: string;
	private dashboardUrl: string;
	private autocompleteUrl: string;
	private compareItemsURL: string;
	private refreshTokenURL: string;
	private pinItemURL: string;
	private UpdatePinOrderURL: string;
	private axiosInstance: AxiosInstance = axios.create();

	constructor(config: HawkSearchConfig) {
		this.baseUrl = config.apiUrl || 'https://searchapi-dev.hawksearch.net';
		this.dashboardUrl = config.dashboardUrl || 'http://test.hawksearch.net/';
		this.searchUrl = config.searchUrl || '/api/v2/search';
		this.autocompleteUrl = config.autocompleteUrl || '/api/autocomplete';
		this.refreshTokenURL = config.refreshTokenURL || '/api/internal-preview/refresh-token/';
		this.axiosInstance.interceptors.request.use(
			conf => {
				if ((conf.url || '').indexOf('refresh-token') !== -1) {
					delete conf.headers.common.Authorization;
					delete conf.headers.common.ClientGuid;
				} else {
					const accessToken = AuthToken.getTokens().accessToken;
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
