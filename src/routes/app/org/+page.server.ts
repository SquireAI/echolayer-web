import { OrganizationApi } from "$lib/api/organization";
import { UserApi } from "$lib/api/user.js";
import { getHttpContext } from "$lib/http/context.js";
import type { Organization, User } from "$lib/types";

export type OrgDetailsPageData = {
	user: User;
	org: Organization;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch }): Promise<OrgDetailsPageData | undefined> {
	try {
		const context = getHttpContext(fetch, cookies);
		const user = await new UserApi(context).get("");
		const orgs = await new OrganizationApi(context).list();
		return { user, org: orgs[0] };
	} catch (error) {
		console.log(error);
	}
}