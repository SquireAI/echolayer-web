import { type HttpError, error } from '@sveltejs/kit';
import { OrganizationApi } from "$lib/api/organization.js";
import { getHttpContext } from '$lib/http/context.js';
import { UserApi } from '$lib/api/user.js';
import { ErrorMessageTypes } from '$lib/error/index.js';
import type { Organization, User } from '$lib/types';
import { ORGANIZATION_ID_COOKIE_NAME } from '$lib/constants';
import type { LayoutServerLoad } from '../../../$types';

export interface OrgsLayoutServerLoad {
	orgs: Organization[];
    /**
     * Their currently selected org if it exists.
     */
    org: Organization;
	user: User;
}

export const load = (async ({ cookies, fetch }) => {
	let orgs: Organization[] | undefined;
    let org: Organization | undefined;
	let user: User | undefined;
	const context = getHttpContext(fetch, cookies);
	try {
		orgs = await new OrganizationApi(context).list();
        const selectedOrgId = cookies.get(ORGANIZATION_ID_COOKIE_NAME);
		org = selectedOrgId ? orgs.find((org) => org.publicId === selectedOrgId): undefined;
		user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	return { orgs, user, org };
}) satisfies LayoutServerLoad;