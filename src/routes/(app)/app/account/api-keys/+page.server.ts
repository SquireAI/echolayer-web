import { AccessTokenApi } from '$lib/api/access-token.js';
import { xsrfToken, type FetchHeader } from '$lib/api/apiUtils.js';
import { ErrorMessageTypes } from '$lib/error';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { AccessToken } from "$lib/types";
import type { PageServerLoad } from './$types';
import { error, type HttpError } from '@sveltejs/kit';

export type ApiKeysPageServerData = Pick<httpContext, "baseHeaders" | "baseUrl"> & {
	xsrfHeader: FetchHeader;
	accessTokens: AccessToken[];
}

export const load = (async ({ cookies, fetch, parent }): Promise<ApiKeysPageServerData> => {
	await parent();
	const context = getHttpContext(fetch, cookies);

	let accessTokens: AccessToken[] = [];
	try {
		accessTokens = await new AccessTokenApi(context).list() || [];
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
	}
	const { baseHeaders, baseUrl } = context;
	return { xsrfHeader: xsrfToken(cookies), accessTokens, baseHeaders, baseUrl };
}) satisfies PageServerLoad;
