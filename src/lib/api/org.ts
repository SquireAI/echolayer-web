import type { Cookies } from "@sveltejs/kit";
import { get, post, type Fetch, xsrfToken, type FetchHeader } from "./apiUtils";
import type { Organization } from "../../types";

export async function getOrganizations(fetch: Fetch, header: FetchHeader): Promise<Organization[]> {
	return await get(fetch, "/api/v1/organization", header);
}

export async function createOrganization(fetch: Fetch, header: FetchHeader, orgName: string): Promise<Organization> {
	return await post(fetch, "/api/v1/organization", { name: orgName }, header);
}
