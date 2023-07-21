import { BaseApi, ENDPOINT } from "./baseApi";

export class SlackApi extends BaseApi<any> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.slack;
	}

	public async install(): Promise<any> {
		await this.httpClient.fetchGET("install");
	}
}
