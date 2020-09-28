import axios, { CancelToken, AxiosRequestConfig, AxiosInstance } from 'axios';
import { Request as SearchRequest, Response as SearchResponse } from 'models/Search';
import { Request as AutocompleteRequest, Response as AutocompleteResponse } from 'models/Autocomplete';
import { HawkSearchConfig } from 'types/HawkSearchConfig';
import Auth from 'components/Auth';

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
	// new URLSearchParams(location.search).get("token")
	constructor(config: HawkSearchConfig) {
		this.baseUrl = config.apiUrl || 'https://searchapi-dev.hawksearch.net';
		this.dashboardUrl = config.dashboardUrl || 'http://test.hawksearch.net/';
		this.searchUrl = config.searchUrl || '/api/v2/search';
		this.autocompleteUrl = config.autocompleteUrl || '/api/autocomplete';
		this.refreshTokenURL = config.refreshTokenURL || '/api/internal-preview/refresh-token/';
		this.axiosInstance.interceptors.request.use(
			conf => {
				const accessToken = Auth.getTokens().accessToken;
				conf.headers.Authorization = `Bearer ${accessToken}`;
				conf.headers.ClientGuid = config.clientGuid;
				console.log('intercepted___request____');
				console.log(conf);
				return conf;
			},
			error => {
				Promise.reject(error);
			}
		);
		this.axiosInstance.interceptors.response.use(
			response => {
				console.log('intercepted___response____');
				console.log(response);
				return response;
			},
			error => {
				console.log('error/////////', error);
				const originalRequest = error.config;

				// if (
				// 	error.response.status === 401 &&
				// 	originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token'
				// ) {
				// 	// router.push('/login');
				// 	return Promise.reject(error);
				// }

				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					const token = Auth.getTokens();
					// return this.axiosInstance.get('https://jsonplaceholder.typicode.com/posts').then(res => {
					// 	return this.axiosInstance(originalRequest);
					// });
					return this.axiosInstance
						.post(new URL(this.refreshTokenURL, this.baseUrl).href, {
							ClientGuid: config.clientGuid,
							Token: token.accessToken,
							RefreshToken: token.refreshToken,
						})
						.then(res => {
							console.log('Auth Success=====', res);
							if (res.status === 201) {
								// localStorageService.setToken(res.data);
								// this.axiosInstance.defaults.headers.common.Authorization =
								// 'Bearer ' + localStorageService.getAccessToken();
								return this.axiosInstance(originalRequest);
							}
							return;
						});
				}
				console.log('///////////////////Reject');
				return Promise.reject(error);
				// return this.axiosInstance(originalRequest);
			}
		);
	}

	public async search(request: SearchRequest, cancellationToken?: CancelToken): Promise<SearchResponse> {
		const result = await axios.post<SearchResponse>(new URL(this.searchUrl, this.baseUrl).href, request, {
			cancelToken: cancellationToken,
			// headers: {
			// 	'X-HawkSearch-ApiKey': '',
			// },
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
