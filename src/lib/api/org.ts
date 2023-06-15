import type { Cookies } from "@sveltejs/kit";
import { XSRF_REQUEST_HEADER, XSRF_TOKEN_COOKIE_NAME, get, type Fetch, xsrfToken } from "./apiUtils";
import type { Organization } from "../../types";

export async function getOrganizations(fetch: Fetch, cookies: Cookies): Promise<Organization[]> {
	return await get(fetch, "/api/v1/organization", xsrfToken(cookies));
}
