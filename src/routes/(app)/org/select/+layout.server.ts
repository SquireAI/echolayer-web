import { getHttpContext, type httpContext } from '$lib/http/context';
import type { LayoutServerLoad } from '../../../../../.svelte-kit/types/src/routes';

export const load = (async ({ fetch, cookies }) => {
	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, cookies);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl
	};
}) satisfies LayoutServerLoad;
