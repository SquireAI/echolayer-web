import { type HttpError, error } from '@sveltejs/kit';
import { OrganizationApi } from "$lib/api/organization.js";
import { AuthApi } from "$lib/api/auth.js";
import { getCookies, normalizeCookie, setServerOrgCookie } from '$lib/utils/cookies.js';
import { createHeaders, getHttpContext } from '$lib/http/context.js';
import type { PageServerLoad } from './$types';
import { UserApi } from '$lib/api/user.js';
import { ErrorMessageTypes } from '$lib/error/index.js';
import type { Organization, User } from '$lib/types';
import { ORGANIZATION_ID_HEADER_NAME } from '$lib/constants';

export const load = (async ({ cookies, fetch, url }) => {
	const code = url.searchParams.get("code");
	let orgs: Organization[] | undefined;
	let org: Organization | undefined;
	let user: User | undefined;
	if (!code) {
		throw error(404, { message: ErrorMessageTypes.GITHUB_OAUTH_CODE });
	}

	let context = getHttpContext(fetch, cookies);
	try {
		const res = await new AuthApi(context).gitHubAuthentication(code);
		const responseCookies = getCookies(res);
		for (const cookie of responseCookies) {
			cookies.set(cookie.name, cookie.value, normalizeCookie(cookie));
		}
	} catch (err: any) {
		console.error(err);
		throw error(404, { message: err.message });
	}
	try {
		context = getHttpContext(fetch, cookies);
		orgs = await new OrganizationApi(context).list();
		if(orgs?.length > 0) {
			if(context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]) {
				org = orgs.find(org => org.publicId === context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]);
			}
			if(orgs?.length === 1 && !context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]) {
				setServerOrgCookie(orgs[0].publicId, cookies.set);
				org = orgs[0];
			}
		}
		user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}

	return { orgs, user, org };
}) satisfies PageServerLoad;
