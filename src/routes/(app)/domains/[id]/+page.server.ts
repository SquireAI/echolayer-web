import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Repository, ComponentEntity, Domain } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import { REPOSITORIES_PATH } from '$lib/utils/paths';
import domainsData from '$lib/data/demo-domains.json';
import filesData from '$lib/data/demo-files.json';
import reposData from '$lib/data/demo-repos.json';
import _ from 'lodash';

export type PageData = {
	domain?: Domain;
	files?: File[];
	repos?: Repository[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	if (!params.id) throw redirect(307, REPOSITORIES_PATH);
	const domain: Domain = _.find(domainsData, ['id', params.id]) || domainsData[0];
	if (!domain || !domain.id) throw redirect(307, REPOSITORIES_PATH);

	const repos = reposData;
	const files = filesData;

	return {
		...(domain && { domain }),
		...(files && { files }),
		...(repos && { repos }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
