import { RepositoryApi } from '$lib/api/repository';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization, Repository } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import type { PageServerLoad } from '../$types';

export type PageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org: Organization;
	repositories: Repository[];
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	const org = await orgRequired(context);

	const repositoryApi = new RepositoryApi(context);
	const repositories = await repositoryApi.list();

	return { baseHeaders, baseUrl, org, repositories };
}) satisfies PageServerLoad;
