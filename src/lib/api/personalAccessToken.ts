import type { AccessToken } from "../types";
import { BaseApi, ENDPOINT } from "./baseApi";

export class PersonalAccessTokenApi extends BaseApi<AccessToken> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.pat;
	}
}
