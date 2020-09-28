import axios from 'axios';

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
	config => {
		//    const token = localStorageService.getAccessToken();
		//    if (token) {
		config.headers['X-Hawksearch-ApiKey'] = 'abc**';
		//    }
		// config.headers['Content-Type'] = 'application/json';
		console.log(config);
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

// Add a response interceptor

// const myInterceptor = axiosInstance.interceptors.response.use(
// 	response => {
// 		return response;
// 	},
// 	error => {
// 		const originalRequest = error.config;

// 		if (error.response.status === 401 && originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token') {
// 			// router.push('/login');
// 			return Promise.reject(error);
// 		}

// 		if (error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;
// 			const refreshToken = localStorageService.getRefreshToken();
// 			return axiosInstance
// 				.post('/api/internal-preview/refresh-token/', {
// 					refresh_token: refreshToken,
// 				})
// 				.then(res => {
// 					if (res.status === 201) {
// 						// localStorageService.setToken(res.data);
// 						axiosInstance.defaults.headers.common['Authorization'] =
// 							'Bearer ' + localStorageService.getAccessToken();
// 						return axiosInstance(originalRequest);
// 					}
// 					return;
// 				});
// 		}
// 		return Promise.reject(error);
// 	}
// );

export const wrappedInstance = axiosInstance;
// axiosInstance.interceptors.request.eject(myInterceptor);
