import type { AccessToken } from "$lib/types";
import { BaseApi, ENDPOINT } from "./baseApi";

export class AccessTokenApi extends BaseApi<AccessToken> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.apiKey;
	}
}
