import type { Cookies } from "@sveltejs/kit";
import { get, type Fetch, xsrfToken, BASE_API_URL } from "./apiUtils";

export async function gitHubAuthentication(fetch: Fetch, code: string): Promise<Response> {
	console.log("authenticating with github", code);
	return fetch(`${BASE_API_URL}/api/v1/auth/github?code=${code}`);
}

export async function checkAuth(fetch: Fetch, cookies: Cookies): Promise<void> {
	await get(fetch, "api/v1/auth/check", xsrfToken(cookies));
}