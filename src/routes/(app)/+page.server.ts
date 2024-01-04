import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import { ComponentApi } from '$lib/api/component';
import { TeamApi } from '$lib/api/team';
import type {
	ComponentEntity,
	Issue,
	TeamEntity,
	Organization,
	Repository,
	Domain,
	Member
} from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { IssueApi } from '$lib/api/issue';
import { RepositoryApi } from '$lib/api/repository';

import domainsData from '$lib/data/demo-domains.json';
import { MemberApi } from '$lib/api/member';

export type HomePageData = {
	teams?: TeamEntity[];
	components?: ComponentEntity[];
	issues?: Issue[];
	repositories?: Repository[];
	domains?: Domain[];
	members?: Member[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<HomePageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const teamApi = new TeamApi(context);
	const componentApi = new ComponentApi(context);
	const issueApi = new IssueApi(context);
	const repositoryApi = new RepositoryApi(context);
	const memberApi = new MemberApi(context);

	const teams = await teamApi.list();
	const components = await componentApi.list();
	const issues = await issueApi.list();
	const repositories = await repositoryApi.list();
	const members = await memberApi.list();

	// TODO: DOMAINS - Replace placeholder data with real API data
	const domains = domainsData;

	return {
		...(teams && { teams }),
		...(components && { components }),
		...(issues && { issues }),
		...(repositories && { repositories }),
		...(domains && { domains }),
		...(members && { members }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
