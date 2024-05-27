import { getHttpContext, type httpContext } from '$lib/http/context';
import { orgOptional, profileOptional } from '$lib/utils/access';
import { ONBOARDING_GITHUB_PATH, ONBOARDING_ORG_PATH } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { Organization } from '$lib/types';

export type ServerPageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org?: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<ServerPageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	// Get user profile if exists
	const profile = await profileOptional(context);
	if (profile) throw redirect(307, ONBOARDING_ORG_PATH);

	return { baseHeaders, baseUrl };
}) satisfies PageServerLoad;
