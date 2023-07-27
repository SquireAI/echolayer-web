import { type HttpError, error } from '@sveltejs/kit';
import { OrganizationApi } from "$lib/api/organization.js";
import { AuthApi } from "$lib/api/auth.js";
import { getCookies, normalizeCookie } from '$lib/utils/cookies.js';
import { createHeaders, getHttpContext } from '$lib/http/context.js';
import type { LayoutServerLoad } from './$types';
import { UserApi } from '$lib/api/user.js';
import { ErrorMessageTypes } from '$lib/error/index.js';
import type { Organization, User } from '$lib/types';
import { authRequired, flagRequired } from '$lib/utils/access';
import { PUBLIC_DISCOVERY_ENABLED } from '$env/static/public';

export interface SpecificOrgLayoutServerLoad {
	org: Organization;
	user: User;
}

// Load user and org for any nested pages automatically.
export const load = (async ({ cookies, fetch, params }) => {
    flagRequired(PUBLIC_DISCOVERY_ENABLED);

	let org: Organization | undefined;
	let user: User | undefined;
	const context = getHttpContext(fetch, createHeaders(cookies, params));
    await authRequired(context);
	try {
		org = await new OrganizationApi(context).get(params.publicId);
		user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	return { org, user };
}) satisfies LayoutServerLoad;
