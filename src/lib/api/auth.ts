import type { Cookies } from "@sveltejs/kit";
import { get, type Fetch, xsrfToken, type FetchHeader } from "./apiUtils";

export async function gitHubAuthentication(fetch: Fetch, header: FetchHeader, code: string): Promise<void> {
	return await get(fetch, `/api/v1/auth/github?code=${code}`, header);
}

export async function authCheck(fetch: Fetch, header: FetchHeader): Promise<boolean> {
	return await get(fetch, "api/v1/auth/check", header);
}
