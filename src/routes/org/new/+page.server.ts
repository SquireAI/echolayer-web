import { authCheck } from '$lib/api/auth.js';
import { getUser } from '$lib/api/user.js';
import type { User } from '../../../types.js';
import { xsrfToken, type FetchHeader } from '$lib/api/apiUtils.js';

export type OrgNewPageServerData = {
	user?: User;
	xsrfHeader: FetchHeader;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch }): Promise<OrgNewPageServerData> {
	let user: User | undefined;
	try {
		await authCheck(fetch, xsrfToken(cookies));
		user = await getUser(fetch, xsrfToken(cookies));
	} catch (error) {
		console.log(error);
	} finally {
		return { user, xsrfHeader: xsrfToken(cookies) };
	}
}