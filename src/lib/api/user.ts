import type { User } from "../types";
import { BaseApi, ENDPOINT } from "./baseApi";

export class UserApi extends BaseApi<User> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.user;
	}
}