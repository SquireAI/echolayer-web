import { HttpClient } from '../http/httpClient';
import type { httpContext } from '$lib/http/context';
import { ENDPOINT, type EndpointType } from './baseApi';
import urlJoin from 'url-join';

export class AuthApi {
	protected httpClient: HttpClient;
	protected endpoint: EndpointType = ENDPOINT.auth;

	constructor(context: httpContext) {
		const httpContext = { ...context };
		httpContext.baseUrl = urlJoin(context.baseUrl, this.endpoint);
		this.httpClient = new HttpClient(httpContext);
	}

	async gitHubAuthentication(code: string): Promise<Response> {
		return this.httpClient.fetchGET('github', { code });
	}

	async checkAuth(): Promise<void> {
		await this.httpClient.fetchGET('check');
	}

	async logout(): Promise<void> {
		await this.httpClient.fetchGET('logout');
	}
}
