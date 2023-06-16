import { createOrganization } from "$lib/api/org";
import type { Organization } from "../../../types";
import type { OrgNewPageServerData } from "./proxy+page.server";

export type OrgNewPageData = Pick<OrgNewPageServerData, "user"> & {
	createOrgHandler: (orgName: string) => Promise<Organization>
}

/** @type {import('./$types').PageLoad} */
export async function load({ parent, fetch, data }) {
	await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { user, xsrfHeader } = data;
	async function createOrgHandler(orgName: string): Promise<Organization> {
		const org = await createOrganization(fetch, xsrfHeader, orgName);
		return org;
	}  
	return { createOrgHandler, user };
};