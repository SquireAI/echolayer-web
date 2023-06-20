import { error } from '@sveltejs/kit';
import type { Organization } from "../../../lib/types.js";
import { OrganizationApi } from "$lib/api/organization.js";
import { AuthApi } from "$lib/api/auth.js";
import { getCookies, normalizeCookie } from '$lib/utils/cookies.js';
import { getHttpContext } from '$lib/http/context.js';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, cookies, fetch, url }) => {
	const _ = await parent();
	const code = url.searchParams.get("code");
	let org: Organization | undefined;
	if (!code) {
		throw error(404, "Unauthorized");
	}
	try {
		let context = getHttpContext(fetch, cookies);
		const res = await new AuthApi(context).gitHubAuthentication(code);
		const responseCookies = getCookies(res);
		for (const cookie of responseCookies) {
			cookies.set(cookie.name, cookie.value, normalizeCookie(cookie));
		}
		context = getHttpContext(fetch, cookies);
		const orgs = await new OrganizationApi(context).list();
		org = orgs.at(0);
	} catch (error) {
		console.log("TODO: error: ", error);
	}
	return { org };
}) satisfies PageServerLoad;
