import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import { ComponentApi } from '$lib/api/component';
import { TeamApi } from '$lib/api/team';
import type { ComponentEntity, Issue, TeamEntity, Organization } from '$lib/types';
import { IssueApi } from '$lib/api/issue';

export type HomePageData = {
	teams?: TeamEntity[];
	components?: ComponentEntity[];
	issues?: Issue[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch, locals }): Promise<HomePageData> => {
	const context = getHttpContext(fetch, cookies);

	const teamApi = new TeamApi(context);
	const componentApi = new ComponentApi(context);
	const issueApi = new IssueApi(context);

	return {
		teams: await teamApi.list(),
		components: await componentApi.list(),
		issues: await issueApi.list(),
		org: locals.org
	};
}) satisfies PageServerLoad;
