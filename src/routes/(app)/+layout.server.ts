import { getHttpContext, type httpContext } from '$lib/http/context';
import type { LayoutServerLoad } from './$types';
import { authRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import { ONBOARDING_PATH } from '$lib/utils/paths';

export const load = (async ({ fetch, cookies }) => {
	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, cookies);

	// Check if user is authenticated
	await authRequired(context);

	// Redirect to org onboarding
	throw redirect(307, ONBOARDING_PATH);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl
	};
}) satisfies LayoutServerLoad;
