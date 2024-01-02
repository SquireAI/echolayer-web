import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Repository, ComponentEntity, Domain } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import { REPOSITORIES_PATH } from '$lib/utils/paths';
import { ComponentApi } from '$lib/api/component';
import domainsData from '$lib/data/demo-domains.json';
import { RepositoryApi } from '$lib/api/repository';

export type PageData = {
	repository: Repository;
	// components?: ComponentEntity[];
	domains?: Domain[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	if (!params.repoOrg || !params.repoName) throw redirect(307, REPOSITORIES_PATH);

	const repositoryApi = new RepositoryApi(context);
	const repositories = await repositoryApi.list({ owner: params.repoOrg, name: params.repoName });
	if (!repositories.length) throw redirect(307, REPOSITORIES_PATH);
	console.log(repositories);
	const repository = await repositoryApi.get(repositories[0].publicId);
	console.log(repository);

	// const componentApi = new ComponentApi(context);
	// const components = await componentApi.list();

	const domains = domainsData;

	return {
		...(repository && { repository }),
		...(domains && { domains }),
		// ...(components && { components }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
