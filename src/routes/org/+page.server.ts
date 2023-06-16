import { xsrfToken } from '$lib/api/apiUtils.js';
import { authCheck } from '$lib/api/auth.js';
import { getUser } from '$lib/api/user.js';
import type { User } from '../../types.js';

export type OrgNewPageData = {
	user: User;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch }): Promise<OrgNewPageData | undefined> {
	try {
		await authCheck(fetch, xsrfToken(cookies));
		const user = await getUser(fetch, xsrfToken(cookies));
		return { user };
	} catch (error) {
		console.log(error);
	}
}