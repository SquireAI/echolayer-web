import { AccessTokenApi } from '$lib/api/access-token.js';
import { xsrfToken, type FetchHeader } from '$lib/api/apiUtils.js';
import { getHttpContext } from '$lib/http/context';
import type { AccessToken } from "$lib/types";

export type PatPageServerData = {
	xsrfHeader: FetchHeader;
	accessTokens: AccessToken[];
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch, parent }): Promise<PatPageServerData> {
	await parent();
	const context = getHttpContext(fetch, cookies);
	const accessTokens: AccessToken[] = await new AccessTokenApi(context).list() || [];
	return { xsrfHeader: xsrfToken(cookies), accessTokens };
}