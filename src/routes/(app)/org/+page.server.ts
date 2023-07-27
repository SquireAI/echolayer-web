import { type HttpError, error } from '@sveltejs/kit';
import { OrganizationApi } from "$lib/api/organization.js";
import { createHeaders, getHttpContext } from '$lib/http/context.js';
import type { PageServerLoad } from './$types';
import { UserApi } from '$lib/api/user.js';
import { ErrorMessageTypes } from '$lib/error/index.js';
import type { Organization, User } from '$lib/types';
import { authRequired, flagRequired } from '$lib/utils/access';
import { PUBLIC_DISCOVERY_ENABLED } from '$env/static/public';

export const load = (async ({ cookies, fetch, url }) => {
    flagRequired(PUBLIC_DISCOVERY_ENABLED);

	let orgs: Organization[] | undefined;
	let user: User | undefined;
	const context = getHttpContext(fetch, createHeaders(cookies));
    await authRequired(context);
	try {
		orgs = await new OrganizationApi(context).list();
		user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	return { orgs, user };
}) satisfies PageServerLoad;
