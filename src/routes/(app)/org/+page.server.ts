import { type HttpError, error } from '@sveltejs/kit';
import { OrganizationApi } from "$lib/api/organization.js";
import { AuthApi } from "$lib/api/auth.js";
import { getCookies, normalizeCookie } from '$lib/utils/cookies.js';
import { createHeaders, getHttpContext } from '$lib/http/context.js';
import { UserApi } from '$lib/api/user.js';
import { ErrorMessageTypes } from '$lib/error/index.js';
import type { Organization, User } from '$lib/types';
import { authRequired, flagRequired } from '$lib/utils/access';
import { PUBLIC_DISCOVERY_ENABLED } from '$env/static/public';
import { ORGANIZATION_ID_COOKIE_NAME } from '$lib/constants';
import type { LayoutServerLoad } from '../$types';

export interface OrgsLayoutServerLoad {
	orgs: Organization[];
    /**
     * Their currently selected org if it exists.
     */
    org: Organization;
	user: User;
}

export const load = (async ({ cookies, fetch }) => {
    flagRequired(PUBLIC_DISCOVERY_ENABLED);

	let orgs: Organization[] | undefined;
    let org: Organization | undefined;
	let user: User | undefined;
	const context = getHttpContext(fetch, cookies);
    await authRequired(context);
	try {
		orgs = await new OrganizationApi(context).list();
        const orgPublicId = cookies.get(ORGANIZATION_ID_COOKIE_NAME);
		org = orgPublicId ? await new OrganizationApi(context).get(orgPublicId): undefined;
		user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	return { orgs, user, org };
}) satisfies LayoutServerLoad;
