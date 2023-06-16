import type { Issue } from "../types";
import { BaseApi } from "./baseApi";

export class IssueApi extends BaseApi<Issue> {
	initializeVariables(): void {
		this.endpoint = "issue";
	}
}