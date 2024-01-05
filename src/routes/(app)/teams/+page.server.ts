import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, TeamEntity } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { TeamApi } from '$lib/api/team';

export type PageData = {
	teams?: TeamEntity[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const teamApi = new TeamApi(context);
	const teams = await teamApi.list();

	return {
		...(teams && { teams }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
