import type { User } from "../types";
import { BaseApi } from "./baseApi";

export class UserApi extends BaseApi<User> {
	initializeVariables(): void {
		this.endpoint = "user";
	}
}