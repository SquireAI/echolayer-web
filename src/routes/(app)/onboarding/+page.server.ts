import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { ONBOARDING_PROFILE_PATH } from '$lib/utils/paths';

export type PageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	// Redirect to org onboarding
	throw redirect(307, ONBOARDING_PROFILE_PATH);

	return { baseHeaders, baseUrl };
}) satisfies PageServerLoad;
