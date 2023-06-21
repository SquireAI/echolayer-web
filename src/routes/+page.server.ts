import { AuthApi } from "$lib/api/auth";
import { OrganizationApi } from "$lib/api/organization";
import { getHttpContext } from "$lib/http/context";
import type { Organization } from "$lib/types.js";
import { CREATE_ORG_PATH, ORGS_PATH, SIGN_IN_PATH } from "$lib/utils/paths";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, cookies }) => {
	const context = getHttpContext(fetch, cookies);
	try {
		await new AuthApi(context).checkAuth();
	}
	catch (error) {
		throw redirect(307, SIGN_IN_PATH);
	}
	let orgs: Organization[] = [];
	try {
		orgs = orgs.concat(await new OrganizationApi(context).list());
	} catch (error) {
		throw redirect(307, SIGN_IN_PATH);
	}
	if (orgs.length > 0) {
		throw redirect(307, ORGS_PATH);
	}
	throw redirect(307, CREATE_ORG_PATH);
}) satisfies PageServerLoad;
