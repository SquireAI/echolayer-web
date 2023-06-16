import type { Cookies } from "@sveltejs/kit";
import { get, type Fetch, type FetchHeader, BASE_API_URL } from "./apiUtils";

export async function gitHubAuthentication(fetch: Fetch, code: string): Promise<Response> {
	return await fetch(`${BASE_API_URL}/api/v1/auth/github?code=${code}`);
}

export async function authCheck(fetch: Fetch, header: FetchHeader): Promise<boolean> {
	return await get(fetch, "api/v1/auth/check", header);
}
