import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type {
	Organization,
	Repository,
	ComponentEntity,
	Domain,
	Location,
	Issue
} from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import { ISSUES_PATH, REPOSITORIES_PATH } from '$lib/utils/paths';
import { ComponentApi } from '$lib/api/component';
import domainsData from '$lib/data/demo-domains.json';
import { IssueApi } from '$lib/api/issue';
import { LocationApi } from '$lib/api/location';

export type PageData = {
	org: Organization;
	issue: Issue;
	locations?: Location[];
};

export const load = (async ({ cookies, fetch, params }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	if (!params.publicId) throw redirect(307, REPOSITORIES_PATH);

	const issueApi = new IssueApi(context);
	const issue = await issueApi.get(params.publicId);

	if (!issue) throw redirect(307, ISSUES_PATH);

	return {
		org,
		...(issue && { issue })
	};
}) satisfies PageServerLoad;
