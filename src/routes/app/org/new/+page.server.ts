import { OrganizationApi } from "$lib/api/organization";
import { getHttpContext } from "$lib/http/context.js";
import type { Organization } from "$lib/types";
import { ORGS_PATH, SIGN_IN_PATH } from "$lib/utils/paths.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch }) {
	let orgs: Organization[] = [];
	const context = getHttpContext(fetch, cookies);
	try {
		orgs = await new OrganizationApi(context).list();
	} catch (error) {
		throw redirect(307, SIGN_IN_PATH);
	}
	if (orgs.length > 0) {
		throw redirect(307, ORGS_PATH);
	}
}