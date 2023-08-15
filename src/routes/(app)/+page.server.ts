import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import { ComponentApi } from '$lib/api/component';
import { TeamApi } from '$lib/api/team';
import type { ComponentEntity, Issue, TeamEntity, Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { IssueApi } from '$lib/api/issue';

export type HomePageData = {
	teams?: TeamEntity[];
	components?: ComponentEntity[];
	issues?: Issue[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<HomePageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const teamApi = new TeamApi(context);
	const componentApi = new ComponentApi(context);
	const issueApi = new IssueApi(context);

	const teams = await teamApi.list();
	const components = await componentApi.list();
	const issues = await issueApi.list();

	return {
		...(teams && { teams }),
		...(components && { components }),
		...(issues && { issues }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
