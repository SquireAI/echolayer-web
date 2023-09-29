import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import type { PageServerLoad } from './$types';

export type GitlabIntegrationsPageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org: Organization;
	step: 'token' | 'webhook';
};

export const load = (async ({ cookies, fetch, url }): Promise<GitlabIntegrationsPageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	const org = await orgRequired(context);
	const step = url.searchParams.get('step') as 'token' | 'webhook';

	return { baseHeaders, baseUrl, org, step };
}) satisfies PageServerLoad;
