import { OrganizationApi } from "$lib/api/organization";
import { getHttpContext } from "$lib/http/context";
import type { Organization } from "$lib/types";

export type OrgNewPageData = {
	createOrgHandler: (orgName: string) => Promise<Organization>
}

/** @type {import('./$types').PageLoad} */
export async function load({ parent, fetch }) {
	const data = await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl } = data;
	async function createOrgHandler(orgName: string): Promise<Organization> {
		const context = { fetch, baseHeaders, baseUrl };
		const org = await new OrganizationApi(context).create({ name: orgName });
		return org;
	}
	return { createOrgHandler };
};