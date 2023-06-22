import { OrganizationApi } from "$lib/api/organization";
import { UserApi } from "$lib/api/user.js";
import { getHttpContext } from "$lib/http/context.js";
import type { Organization, User } from "$lib/types";
import { error, type HttpError } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ErrorMessageTypes } from "$lib/error";

export type OrgDetailsPageData = {
	user: User;
	org: Organization;
}

export const load = (async ({ cookies, fetch }): Promise<OrgDetailsPageData | undefined> => {
	try {
		const context = getHttpContext(fetch, cookies);
		let user: User | undefined;
		let orgs: Organization[] | undefined;
		try {
			user = await new UserApi(context).get("");
			orgs = await new OrganizationApi(context).list();
			return { user, org: orgs[0] };
		} catch (err) {
			if ((err as HttpError).status === 401) {
				throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
			} else {
				throw error(404, { message: ErrorMessageTypes.GENERIC });
			}
		}
	} catch (error) {
		console.log(error);
	}
}) satisfies PageServerLoad;
