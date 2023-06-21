import { OrganizationApi } from "$lib/api/organization";
import { UserApi } from "$lib/api/user.js";
import { getHttpContext } from "$lib/http/context.js";
import type { Organization, User } from "$lib/types";
import type { PageServerLoad } from "./$types";

export type OrgDetailsPageData = {
	user: User;
	org: Organization;
}

export const load = (async ({ cookies, fetch }): Promise<OrgDetailsPageData | undefined> => {
	try {
		const context = getHttpContext(fetch, cookies);
		const user = await new UserApi(context).get("");
		const orgs = await new OrganizationApi(context).list();
		return { user, org: orgs[0] };
	} catch (error) {
		console.log(error);
	}
}) satisfies PageServerLoad;
