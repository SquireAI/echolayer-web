import { HttpClient } from '../http/httpClient';
import type { httpContext } from '$lib/http/context';
import { ENDPOINT, type EndpointType } from './baseApi';
import urlJoin from 'url-join';
import type { User } from '$lib/types';

export class AuthApi {
	protected httpClient: HttpClient;
	protected endpoint: EndpointType = ENDPOINT.auth;

	constructor(context: httpContext) {
		const httpContext = { ...context };
		httpContext.baseUrl = urlJoin(context.baseUrl, this.endpoint);
		this.httpClient = new HttpClient(httpContext);
	}

	async providerAuthentication(provider: string, params: any): Promise<Response> {
		return this.httpClient.fetchGET(provider, params);
	}

	async retrieveOAuthUrl(provider: string): Promise<string> {
		const resp = await this.httpClient.fetchGET(`${provider}/oauth`);
		return resp.json() as Promise<string>;
	}

	async checkAuth(): Promise<User> {
		const resp = await this.httpClient.fetchGET('check');
		return resp.json() as Promise<User>;
	}

	async logout(): Promise<void> {
		await this.httpClient.fetchGET('logout');
	}
}
