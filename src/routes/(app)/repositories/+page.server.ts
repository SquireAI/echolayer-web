import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Repository } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { RepositoryApi } from '$lib/api/repository';

export type PageData = {
	repositories?: Repository[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const repositoryApi = new RepositoryApi(context);
	const repositories = await repositoryApi.list();

	return {
		...(repositories && { repositories }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
