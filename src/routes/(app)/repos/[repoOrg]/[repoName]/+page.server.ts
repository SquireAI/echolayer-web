import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Repo, ComponentEntity, Domain } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import { REPOS_PATH } from '$lib/utils/paths';
import { ComponentApi } from '$lib/api/component';
import domainsData from '$lib/data/demo-domains.json';

export type PageData = {
	repo: {
		organization: string;
		name: string;
	};
	components?: ComponentEntity[];
	domains?: Domain[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	if (!params.repoOrg || !params.repoName) throw redirect(307, REPOS_PATH);

	const repo = {
		organization: params.repoOrg,
		name: params.repoName
	};

	const componentApi = new ComponentApi(context);
	const components = await componentApi.list();

	const domains = domainsData;

	return {
		...(repo && { repo }),
		...(domains && { domains }),
		...(components && { components }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
