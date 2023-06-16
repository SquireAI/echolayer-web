import type { Organization } from "../types";
import { BaseApi } from "./baseApi";

export class OrganizationApi extends BaseApi<Organization> {
	initializeVariables(): void {
		this.endpoint = "organization";
	}
}
