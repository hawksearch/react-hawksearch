class AuthToken {
	private static instance: AuthToken;
	private refreshToken: string;
	private accessToken: string;

	/**
	 * The Singleton's constructor should always be private to prevent direct
	 * construction calls with the `new` operator.
	 */
	private constructor() {}

	/**
	 * The static method that controls the access to the singleton instance.
	 *
	 * This implementation let you subclass the Singleton class while keeping
	 * just one instance of each subclass around.
	 */
	public static getInstance(url?: string): AuthToken {
		if (!AuthToken.instance) {
			AuthToken.instance = new AuthToken();
		}

		return AuthToken.instance;
	}

	public setTokens(accessToken: string, refreshToken: string) {
		this.refreshToken = refreshToken;
		this.accessToken = accessToken;
	}

	public getTokens() {
		return {
			refreshToken: this.refreshToken,
			accessToken: this.accessToken,
		};
	}
}

export default AuthToken.getInstance();
