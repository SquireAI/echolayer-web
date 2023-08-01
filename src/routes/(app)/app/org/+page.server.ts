import { OrganizationApi } from "$lib/api/organization";
import { UserApi } from "$lib/api/user";
import { getHttpContext, type httpContext } from "$lib/http/context";
import type { ComponentEntity, Issue, Organization, User } from "$lib/types";
import { error, type HttpError } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ErrorMessageTypes } from "$lib/error";
import { ComponentApi } from "$lib/api/component";
import { IssueApi } from "$lib/api/issue";
import {orgRequired} from "$lib/utils/access";

export type OrgDetailsPageData = {
	user: User;
	org: Organization;
	issues: Issue[];
	components: ComponentEntity[];
	baseHeaders: httpContext["baseHeaders"];
	baseUrl: httpContext["baseUrl"];
}

export const load = (async ({ cookies, fetch }): Promise<OrgDetailsPageData | undefined> => {
	try {
		const context = getHttpContext(fetch, cookies);

		// Check if user has an organization
		const org = await orgRequired(context);

		let user: User | undefined;
		let orgs: Organization[] | undefined;
		let components: ComponentEntity[] | undefined;
		let issues: Issue[] | undefined;
		try {
			user = await new UserApi(context).get("");
			orgs = await new OrganizationApi(context).list();
			components = await new ComponentApi(context).list();
			issues = await new IssueApi(context).list();
			return { user, org, issues, components, baseHeaders: context.baseHeaders, baseUrl: context.baseUrl };
		} catch (err) {
			if ((err as HttpError).status === 401) {
				throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
			} else {
				throw error(404, { message: ErrorMessageTypes.GENERIC });
			}
		}
	} catch (err) {
		console.log(err);
	}
}) satisfies PageServerLoad;
