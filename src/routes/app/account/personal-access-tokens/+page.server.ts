import { getAccessTokens } from '$lib/api/access-token.js';
import { xsrfToken, type FetchHeader } from '$lib/api/apiUtils.js';
import type { AccessToken } from '../../../../types.js';

export type PatPageServerData = {
	xsrfHeader: FetchHeader;
	accessTokens: AccessToken[];
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch, parent }): Promise<PatPageServerData> {
	await parent();
	const accessTokens: AccessToken[] = await getAccessTokens(fetch, xsrfToken(cookies));
	return { xsrfHeader: xsrfToken(cookies), accessTokens };
}