import { BaseApi, ENDPOINT } from './baseApi';

export class GithubApp extends BaseApi<any> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.githubApp;
	}

	public async install(): Promise<string> {
		return (await this.httpClient.fetchGET('install')).json() as Promise<string>;
	}

	public async check(): Promise<boolean> {
		try {
			await this.httpClient.fetchGET('/install/check');
			return true;
		} catch (e) {
			return false;
		}
	}
}
