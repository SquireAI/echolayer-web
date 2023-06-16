import { xsrfToken } from "$lib/api/apiUtils";
import { authCheck } from "$lib/api/auth";
import { getOrganizations } from "$lib/api/org";
import { getUser } from "$lib/api/user";
import type { OrgAndUserData } from "../../../../types";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch }): Promise<OrgAndUserData | undefined> {
	try {
		await authCheck(fetch, xsrfToken(cookies));
		const user = await getUser(fetch, xsrfToken(cookies));
		const org = await getOrganizations(fetch, xsrfToken(cookies));
		return { user, org: org[0] };
	} catch (error) {
		console.log(error);
	}
}
