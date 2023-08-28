import { AuthApi } from '$lib/api/auth.js';
import { InvitationUserApi } from '$lib/api/invitation-user';
import { OrganizationApi } from '$lib/api/organization.js';
import { UserApi } from '$lib/api/user.js';
import { ORGANIZATION_ID_HEADER_NAME } from '$lib/constants';
import { ErrorMessageTypes } from '$lib/error/index.js';
import { getHttpContext } from '$lib/http/context.js';
import type { Invitation, Organization, User } from '$lib/types';
import { getCookies, normalizeCookie, setServerOrgCookie } from '$lib/utils/cookies.js';
import { error, type HttpError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, fetch, url }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const provider = url.searchParams.get('provider');
	let orgs: Organization[] | undefined;
	let org: Organization | undefined;
	let user: User | undefined;
	let userInvitations: Invitation[] | undefined;
	if (!code || !provider) {
		throw error(404, { message: ErrorMessageTypes.OAUTH_ERROR });
	}

	let context = getHttpContext(fetch, cookies);
	try {
		let authParams = {};
		switch (provider) {
			case 'github':
				authParams = { code, state };
				break;
		}
		const res = await new AuthApi(context).providerAuthentication(provider, authParams);
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
		userInvitations = await new InvitationUserApi(context).list({ pending: true });
		if (orgs?.length > 0) {
			if (context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]) {
				org = orgs.find((org) => org.publicId === context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]);
			}
			if (
				orgs?.length === 1 &&
				!context.baseHeaders[ORGANIZATION_ID_HEADER_NAME] &&
				userInvitations?.length === 0
			) {
				setServerOrgCookie(orgs[0].publicId, cookies.set);
				org = orgs[0];
			}
		}
		user = await new UserApi(context).get('');
	} catch (err) {
		console.error(err);
		if ((err as HttpError).status === 401) {
			throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}

	return { orgs, user, org, userInvitations };
}) satisfies PageServerLoad;
