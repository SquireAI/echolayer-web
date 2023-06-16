import { error } from '@sveltejs/kit';
import type { Organization } from "../../../types.js";
import { getOrganizations } from "$lib/api/org.js";
import { gitHubAuthentication } from "$lib/api/auth.js";
import { xsrfToken } from '$lib/api/apiUtils.js';
import setCookie from "set-cookie-parser";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch, url }) {
	const code = url.searchParams.get("code");
	let org: Organization | undefined;
	if (!code) {
		throw error(404, "Unauthorized");
	}
	try {
		const resp = await gitHubAuthentication(fetch, code);
		const respCookies = setCookie.parse(setCookie.splitCookiesString(resp.headers.get("set-cookie") || ""));
		for (const cookie of respCookies) {
			cookies.set(cookie.name, cookie.value, { ... cookie, sameSite: undefined, });
		}
		const orgs = await getOrganizations(fetch, xsrfToken(cookies));
		org = orgs.at(0);
	} catch (error) {
		console.log("TODO: error: ", error);
	}
	return { org };
}
