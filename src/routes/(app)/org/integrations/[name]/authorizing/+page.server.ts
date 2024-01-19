import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ONBOARDING_PATH } from '$lib/utils/paths';

export type AuthorizingPageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<AuthorizingPageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	const org = await orgRequired(context);

	// TODO: Temporarily send users to onboarding
	if (params.name === 'github') throw redirect(307, `${ONBOARDING_PATH}/github`);

	return { baseHeaders, baseUrl, org };
}) satisfies PageServerLoad;
