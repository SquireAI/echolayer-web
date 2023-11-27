import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Repo } from '$lib/types';
import { orgRequired } from '$lib/utils/access';

export type PageData = {
	repos?: Repo[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

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
		...(repos && { repos }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
