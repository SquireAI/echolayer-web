import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Repo } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { redirect } from '@sveltejs/kit';
import { INVALIDATED_SIGN_IN_PATH, REPOS_PATH } from '$lib/utils/paths';

export type PageData = {
	repo: {
		organization: string;
		name: string;
	};
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

	return {
		...(repo && { repo }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
