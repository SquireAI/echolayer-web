import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import type { PageServerLoad } from '../$types';

export type PageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	const org = await orgRequired(context);

	return { baseHeaders, baseUrl, org };
}) satisfies PageServerLoad;
