import type { AccessToken } from "../types";
import { BaseApi } from "./baseApi";

export class PersonalAccessTokenApi extends BaseApi<AccessToken> {
	initializeVariables(): void {
		this.endpoint = "auth/pat";
	}
}
