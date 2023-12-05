import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Repo } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import reposData from '$lib/data/demo-repos.json';

export type PageData = {
	repos?: Repo[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const repos = reposData;

	return {
		...(repos && { repos }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
