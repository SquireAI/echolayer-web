import { getHttpContext, type httpContext } from '$lib/http/context';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, cookies);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl
	};
}) satisfies LayoutServerLoad;
