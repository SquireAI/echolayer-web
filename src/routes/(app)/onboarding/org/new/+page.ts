import { OrganizationApi } from '$lib/api/organization';
import { createDefaultContext } from '$lib/http/context';
import type { Organization } from '$lib/types';
import type { PageLoad } from './$types';

export type OrgNewPageData = {
	createOrgHandler: (name: string) => Promise<Organization>;
};

export const load = (async ({ fetch, data }) => {
	const { baseHeaders, baseUrl } = data;
	async function createOrgHandler(name: string): Promise<Organization> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new OrganizationApi(context).create({ name });
	}
	return { createOrgHandler };
}) satisfies PageLoad;
