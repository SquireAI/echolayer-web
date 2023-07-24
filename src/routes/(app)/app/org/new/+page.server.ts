import { getHttpContext, type httpContext } from "$lib/http/context.js";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies, fetch }): Promise<Pick<httpContext, "baseHeaders" | "baseUrl"> | undefined> => {
	const context = getHttpContext(fetch, cookies);
	const { fetch: contextFetch, ...rest } = context;
	return rest;
}) satisfies PageServerLoad;
