import type { Cookies } from "@sveltejs/kit";
import { get, type Fetch, xsrfToken } from "./apiUtils";

export async function gitHubAuthentication(fetch: Fetch, cookies: Cookies, code: string): Promise<void> {
	return await get(fetch, `/api/v1/auth/github?code=${code}`, xsrfToken(cookies));
}