import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import type { PageServerLoad } from '../$types';

export type IntegrationsPageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org: Organization;
};

export const load = (async ({ cookies, fetch, locals }): Promise<IntegrationsPageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	return { baseHeaders, baseUrl, org: locals.org };
}) satisfies PageServerLoad;
