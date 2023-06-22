import { OrganizationApi } from "$lib/api/organization";
import { createDefaultContext } from "$lib/http/context";
import type { Organization } from "$lib/types";
import type { PageLoad } from "./$types";

export type OrgNewPageData = {
	createOrgHandler: (orgName: string) => Promise<Organization>
}

export const load = (async ({ parent, fetch, data }) => {
	await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl } = data;
	async function createOrgHandler(orgName: string): Promise<Organization> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new OrganizationApi(context).create({ name: orgName });
	}
	return { createOrgHandler };
}) satisfies PageLoad;