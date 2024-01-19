import type { PageServerLoad } from './$types';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization, Location, Issue } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import { ISSUES_PATH } from '$lib/utils/paths';
import { IssueApi } from '$lib/api/issue';

export type PageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	issue: Issue;
	org: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	const org = await orgRequired(context);
	console.log('ORG --->>', org);

	if (!params.publicId) throw redirect(307, ISSUES_PATH);

	const issueApi = new IssueApi(context);
	const issue = await issueApi.get(params.publicId);

	if (!issue) throw redirect(307, ISSUES_PATH);

	return {
		baseHeaders,
		baseUrl,
		org,
		issue
	};
}) satisfies PageServerLoad;
