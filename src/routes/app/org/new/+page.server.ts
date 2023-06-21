import { OrganizationApi } from "$lib/api/organization";
import { getHttpContext, type httpContext } from "$lib/http/context.js";
import type { Organization } from "$lib/types";
import { ORGS_PATH, SIGN_IN_PATH } from "$lib/utils/paths.js";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies, fetch }): Promise<Pick<httpContext, "baseHeaders" | "baseUrl"> | undefined> => {
	let orgs: Organization[] = [];
	const context = getHttpContext(fetch, cookies);
	try {
		orgs = await new OrganizationApi(context).list();
		if (orgs.length > 0) {
			throw redirect(307, ORGS_PATH);
		}
		const { fetch, ...rest } = context;
		return rest;
	} catch (error) {
		throw redirect(307, SIGN_IN_PATH);
	}
}) satisfies PageServerLoad;
