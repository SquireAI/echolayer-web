import {createHeaders, getHttpContext, type httpContext} from "$lib/http/context";
import type { LayoutServerLoad } from "./$types";
import {authRequired} from "$lib/utils/access";


export const load = (async ({ fetch, cookies }) => {
	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, createHeaders(cookies));

	// Check if user is authenticated
	await authRequired(context);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
	}
}) satisfies LayoutServerLoad;
