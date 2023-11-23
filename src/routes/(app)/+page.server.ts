import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import { ComponentApi } from '$lib/api/component';
import { TeamApi } from '$lib/api/team';
import type { ComponentEntity, Issue, TeamEntity, Organization, Repo } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { IssueApi } from '$lib/api/issue';

export type HomePageData = {
	teams?: TeamEntity[];
	components?: ComponentEntity[];
	issues?: Issue[];
	repos?: Repo[];
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

	const repos = [
		{
			id: 1,
			publicId: 'echolayer-api',
			organizationId: 1,
			name: 'echolayer-api',
			default_branch: 'main',
			description: 'API for EchoLayer',
			owner: '@team-devops',
			knowledge_owner: '@team-backend',
			type: 'Repo'
		},
		{
			id: 2,
			publicId: 'echolayer-frontend',
			organizationId: 1,
			name: 'echolayer-front',
			default_branch: 'dev',
			description: 'EchoLayer Frontend',
			owner: '@team-frontend',
			knowledge_owner: '@team-frontend',
			type: 'Repo'
		}
	];

	return {
		...(teams && { teams }),
		...(components && { components }),
		...(issues && { issues }),
		...(repos && { repos }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
