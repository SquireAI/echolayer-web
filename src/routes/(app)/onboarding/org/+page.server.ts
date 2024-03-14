import { RepositoryApi } from '$lib/api/repository';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { Organization, Repository } from '$lib/types';
import { orgOptional } from '$lib/utils/access';
import { ONBOARDING_PATH } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export type PageData = {
	baseHeaders: httpContext['baseHeaders'];
	baseUrl: httpContext['baseUrl'];
	org?: Organization;
};

export const load = (async ({ cookies, fetch, params }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);
	const { baseHeaders, baseUrl } = context;

	// Optionally setup org
	const org = await orgOptional(context);
	// if (org) throw redirect(307, `${ONBOARDING_PATH}/github`);

	return { baseHeaders, baseUrl };
}) satisfies PageServerLoad;
