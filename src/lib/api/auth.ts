import { HttpClient } from "../http/httpClient";
import type { httpContext } from "$lib/http/context";

export class AuthApi {
	protected httpClient: HttpClient;

	constructor(context: httpContext) {
		this.httpClient = new HttpClient(context);
	}

	async gitHubAuthentication(code: string): Promise<Response> {
		return this.httpClient.fetchGET("/auth/github", { code });
	}

	async checkAuth(): Promise<void> {
		await this.httpClient.fetchGET("/auth/check");
	}

	async logout(): Promise<void> {
		await this.httpClient.fetchGET("/api/v1/auth/logout");
	}
}
