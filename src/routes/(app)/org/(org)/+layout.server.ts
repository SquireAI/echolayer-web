import { type HttpError, error } from '@sveltejs/kit';
import { OrganizationApi } from "$lib/api/organization.js";
import { AuthApi } from "$lib/api/auth.js";
import { getCookies, normalizeCookie } from '$lib/utils/cookies.js';
import { createHeaders, getHttpContext } from '$lib/http/context.js';
import { UserApi } from '$lib/api/user.js';
import { ErrorMessageTypes } from '$lib/error/index.js';
import type { Organization, User } from '$lib/types';
import { authRequired, flagRequired, orgRequired } from '$lib/utils/access';
import { PUBLIC_DISCOVERY_ENABLED } from '$env/static/public';
import { ORGANIZATION_ID_COOKIE_NAME } from '$lib/constants';
import type { LayoutServerLoad } from '../../$types';

export interface SpecificOrgLayoutServerLoad {
	org: Organization;
	user: User;
}

// Load user and org for any nested pages automatically.
export const load = (async ({ cookies, fetch }) => {
	console.log("ORGS LAYOUT RUNS!");
    flagRequired(PUBLIC_DISCOVERY_ENABLED);

	let org: Organization | undefined;
	let user: User | undefined;
	const context = getHttpContext(fetch, cookies);
    await authRequired(context);
	await orgRequired(context);
	try {
		const orgPublicId = cookies.get(ORGANIZATION_ID_COOKIE_NAME);
		org = await new OrganizationApi(context).get(orgPublicId!);
		user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	return { org, user };
}) satisfies LayoutServerLoad;
