import { getHttpContext, type httpContext } from '$lib/http/context';
import type { PageServerLoad } from './$types';

export type IntegrationsPageData = {
	baseHeaders: httpContext["baseHeaders"];
	baseUrl: httpContext["baseUrl"];
}

export const load = (async ({ cookies, fetch }): Promise<IntegrationsPageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;
	return { baseHeaders, baseUrl };
}) satisfies PageServerLoad;
