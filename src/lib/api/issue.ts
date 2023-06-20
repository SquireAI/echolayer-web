import type { Issue } from "../types";
import { BaseApi, ENDPOINT } from "./baseApi";

export class IssueApi extends BaseApi<Issue> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.issue;
	}
}