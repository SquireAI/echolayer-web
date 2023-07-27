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



export function getHttpContext(fetchFn?: typeof fetch, headers: FetchHeader = {}, baseUrl?: string){ // TODO: Is BaseUrl Needed? Not used anywhere...
	return createDefaultContext(fetchFn, headers, baseUrl);
}

export function createHeaders(cookies?: Cookies, routeParams?: { [key: string]: string }): FetchHeader {
	const headers: FetchHeader = {};
	if (cookies !== undefined) {
		const xsrfToken = cookies.get("CSRF-TOKEN");
		if (xsrfToken !== undefined) {
			headers["X-XSRF-TOKEN"] = xsrfToken;
		}
	}

	if(routeParams !== undefined){
		if(routeParams.publicId !== undefined){
			headers["X-ORGANIZATION-ID"] = routeParams.publicId;
		}
	}
	return headers;
}