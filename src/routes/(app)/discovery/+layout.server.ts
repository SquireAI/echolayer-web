import { getHttpContext, type httpContext } from "$lib/http/context";
import type { LayoutServerLoad } from "./$types";
import { authRequired } from "$lib/utils/auth";


export const load = (async ({ fetch, cookies, parent }) => {
	await parent();

	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, cookies);

	// Check if user is authenticated
	const authedUser = await authRequired(context);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
	}
}) satisfies LayoutServerLoad;
