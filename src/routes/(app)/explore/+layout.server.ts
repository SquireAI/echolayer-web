import { getHttpContext, type httpContext } from '$lib/http/context';
import type { LayoutServerLoad } from './$types';
import { authRequired, orgRequired } from '$lib/utils/access';

export const load = (async ({ fetch, cookies }) => {
	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, cookies);

	// Check if user is authenticated
	await authRequired(context);

	// Check if user has an organization
	const org = await orgRequired(context);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
		org
	};
}) satisfies LayoutServerLoad;
