import { PUBLIC_BASE_API_URL } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';
import type { FetchHeader } from '../api/apiUtils';

export const DEFAULT_BASE_URL:string = PUBLIC_BASE_API_URL || "";

export interface httpContext {
	fetch: typeof fetch;
	baseHeaders: FetchHeader;
	baseUrl: string;
}

export function createDefaultContext(fetchFn = fetch, baseHeaders:FetchHeader = {}, baseUrl = DEFAULT_BASE_URL): httpContext {
	return {
		fetch: fetchFn,
		baseHeaders,
		baseUrl,
	};
}

export function getHttpContext(fetchFn?: typeof fetch, cookies?: Cookies, baseUrl?: string){
	return createDefaultContext(fetchFn, createHeaders(cookies), baseUrl);
}

export function createHeaders(cookies?: Cookies): FetchHeader {
	const headers: FetchHeader = {};
	if (cookies !== undefined) {
		const xsrfToken = cookies.get("CSRF-TOKEN");
		if (xsrfToken !== undefined) {
			headers["X-XSRF-TOKEN"] = xsrfToken;
		}
	}
	return headers;
}