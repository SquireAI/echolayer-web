import { getHttpContext, type httpContext } from "$lib/http/context";
import type { LayoutServerLoad } from "./$types";

export type ContextData = Omit<httpContext, "fetch">;

export const load = (async ({ fetch, cookies }) => {
	const context = getHttpContext(fetch, cookies);
    return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
	}
}) satisfies LayoutServerLoad;
