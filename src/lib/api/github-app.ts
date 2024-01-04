import type { IntegrationInstallStatus } from '$lib/types';
import { BaseApi, ENDPOINT } from './baseApi';

export class GithubApp extends BaseApi<any> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.sourceGithub;
	}

	public async install(): Promise<string> {
		return (await this.httpClient.fetchGET('install')).json() as Promise<string>;
	}

	public async check(): Promise<IntegrationInstallStatus> {
		try {
			const response = await this.httpClient.fetchGET('/install/check');
			const data = await response.json();
			return data.status || undefined;
		} catch (e) {
			return undefined;
		}
	}
}
