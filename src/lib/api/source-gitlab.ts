import type { IntegrationStatus } from '$lib/types';
import { BaseApi, ENDPOINT } from './baseApi';

export class SourceGitlabApi extends BaseApi<any> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.sourceGitlab;
	}
	public async install(accessToken: string): Promise<string> {
		return (
			await this.httpClient.fetchPOST('install', undefined, { accessToken })
		).json() as Promise<string>;
	}

	public async getSecretToken(): Promise<string> {
		return (await this.httpClient.fetchGET('secret-key')).json() as Promise<string>;
	}

	public async check(): Promise<IntegrationStatus> {
		return (await this.httpClient.fetchGET('check')).json() as Promise<IntegrationStatus>;
	}
}
