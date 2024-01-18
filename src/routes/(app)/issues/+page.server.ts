import { IssueApi } from '$lib/api/issue';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Issue, Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import type { PageServerLoad } from '../org/$types';

export type PageData = {
	org: Organization;
	issues?: Issue[];
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	const org = await orgRequired(context);

	const issueApi = new IssueApi(context);
	const issues = await issueApi.list();

	return {
		org,
		...(issues && { issues })
	};
}) satisfies PageServerLoad;
