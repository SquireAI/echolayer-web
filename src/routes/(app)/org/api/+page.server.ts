import { AccessTokenApi } from '$lib/api/access-token.js';
import { xsrfToken, type FetchHeader } from '$lib/api/apiUtils.js';
import { ErrorMessageTypes } from '$lib/error';
import { getHttpContext, type httpContext } from '$lib/http/context';
import type { AccessToken, Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import type { PageServerLoad } from './$types';
import { error, type HttpError } from '@sveltejs/kit';

export type ApiKeysPageServerData = Pick<httpContext, 'baseHeaders' | 'baseUrl'> & {
	xsrfHeader: FetchHeader;
	accessTokens: AccessToken[];
	org: Organization;
};

export const load = (async ({ cookies, fetch, parent }): Promise<ApiKeysPageServerData> => {
	const context = getHttpContext(fetch, cookies);
	const org = await orgRequired(context);

	let accessTokens: AccessToken[] = [];
	try {
		accessTokens = (await new AccessTokenApi(context).list()) || [];
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
	}
	const { baseHeaders, baseUrl } = context;
	return { xsrfHeader: xsrfToken(cookies), accessTokens, baseHeaders, baseUrl, org };
}) satisfies PageServerLoad;
