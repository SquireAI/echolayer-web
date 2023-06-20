import { getHttpContext, type httpContext } from "$lib/http/context";

export type ContextData = Omit<httpContext, "fetch">;

/** @type {import('./$types').LayoutServerLoad} */
export function load({ fetch, cookies }) {
	const context = getHttpContext(fetch, cookies);
    return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
	}
}