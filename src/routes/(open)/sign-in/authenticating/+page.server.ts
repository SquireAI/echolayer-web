import { type HttpError, error } from '@sveltejs/kit';
import { OrganizationApi } from "$lib/api/organization.js";
import { AuthApi } from "$lib/api/auth.js";
import { getCookies, normalizeCookie } from '$lib/utils/cookies.js';
import { getHttpContext } from '$lib/http/context.js';
import type { PageServerLoad } from './$types';
import { UserApi } from '$lib/api/user.js';
import { ErrorMessageTypes } from '$lib/error/index.js';
import type { Organization, User } from '$lib/types';

export const load = (async ({ cookies, fetch, url }) => {
	const code = url.searchParams.get("code");
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
		const orgs = await new OrganizationApi(context).list();
		org = orgs.at(0);
		user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	return { org, user };
}) satisfies PageServerLoad;
