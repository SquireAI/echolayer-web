import { AccessTokenApi } from '$lib/api/access-token.js';
import { xsrfToken, type FetchHeader } from '$lib/api/apiUtils.js';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { AccessToken } from "$lib/types";
import type { PageServerLoad } from './$types';

export type PatPageServerData = Pick<httpContext, "baseHeaders" | "baseUrl"> & {
	xsrfHeader: FetchHeader;
	accessTokens: AccessToken[];
}

export const load = (async ({ cookies, fetch, parent }): Promise<PatPageServerData> => {
	await parent();
	const context = getHttpContext(fetch, cookies);
	const accessTokens: AccessToken[] = await new AccessTokenApi(context).list() || [];
	const { baseHeaders, baseUrl } = context;
	return { xsrfHeader: xsrfToken(cookies), accessTokens, baseHeaders, baseUrl };
}) satisfies PageServerLoad;
