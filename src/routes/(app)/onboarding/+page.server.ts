import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { ONBOARDING_PATH } from '$lib/utils/paths';

export type PageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	throw redirect(307, `${ONBOARDING_PATH}/org`);

	return { baseHeaders, baseUrl };
}) satisfies PageServerLoad;
