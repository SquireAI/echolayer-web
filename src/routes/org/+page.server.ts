import { xsrfToken } from '$lib/api/apiUtils.js';
import { authCheck } from '$lib/api/auth.js';
import { getOrganizations } from '$lib/api/org.js';
import { getUser } from '$lib/api/user.js';
import type { Organization, User } from '../../types.js';

export type OrgDetailsPageData = {
	user: User;
	org: Organization;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch }): Promise<OrgDetailsPageData | undefined> {
	try {
		await authCheck(fetch, xsrfToken(cookies));
		const user = await getUser(fetch, xsrfToken(cookies));
		const org = await getOrganizations(fetch, xsrfToken(cookies));
		return { user, org: org[0] };
	} catch (error) {
		console.log(error);
	}
}