import { RepositoryApi } from '$lib/api/repository';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization, Profile, Repository } from '$lib/types';
import { orgOptional, profileOptional } from '$lib/utils/access';
import { ONBOARDING_ORG_PATH } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { ProfileApi } from '$lib/api/profile';

export type PageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org?: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	// Get user profile
	const profile = await profileOptional(context);
	if (profile) throw redirect(307, `${ONBOARDING_ORG_PATH}`);

	return { baseHeaders, baseUrl };
}) satisfies PageServerLoad;
