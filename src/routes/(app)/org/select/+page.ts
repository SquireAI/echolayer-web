import { InvitationUserApi } from '$lib/api/invitation-user';
import { OrganizationApi } from '$lib/api/organization';
import { UserApi } from '$lib/api/user';
import { ORGANIZATION_ID_COOKIE_NAME } from '$lib/constants';
import { ErrorMessageTypes } from '$lib/error';
import { createDefaultContext } from '$lib/http/context';
import type { Invitation, Organization, User } from '$lib/types';
import { authRequired } from '$lib/utils/access';
import { HOME_PATH, INVALIDATED_SIGN_IN_PATH, ORGS_PATH } from '$lib/utils/paths';
import { error, redirect, type HttpError } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export interface OrgsLayoutLoad {
	orgs: Organization[];
	/**
	 * Their currently selected org if it exists.
	 */
	org?: Organization;
	user: User;
	userInvitations: Invitation[];
	acceptInvitationHandler: (publicId: string) => Promise<Invitation>;
	reloadInvitationsHandler: () => Promise<Invitation[]>;
}

export const load = (async ({ parent, fetch, data }): Promise<OrgsLayoutLoad> => {
	const parentData = await parent();

	const { baseHeaders, baseUrl } = parentData;
	const context = createDefaultContext(fetch, baseHeaders, baseUrl);
	let orgs: Organization[] | undefined;
	let org: Organization | undefined;
	let user: User | undefined;
	let userInvitations: Invitation[] | undefined;

	await authRequired(context);
	try {
		orgs = await new OrganizationApi(context).list();
		userInvitations = await new InvitationUserApi(context).list({ pending: true });
		const selectedOrgId = baseHeaders[ORGANIZATION_ID_COOKIE_NAME];
		org = selectedOrgId ? orgs.find((org) => org.publicId === selectedOrgId) : undefined;
		user = await new UserApi(context).get('');
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw redirect(307, INVALIDATED_SIGN_IN_PATH);
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	const acceptInvitationHandler = async (publicId: string): Promise<Invitation> => {
		return await new InvitationUserApi(context).update(publicId, {});
	};
	const reloadInvitationsHandler = async (): Promise<Invitation[]> => {
		return await new InvitationUserApi(context).list({ pending: true });
	};
	return { orgs, user, org, userInvitations, acceptInvitationHandler, reloadInvitationsHandler };
}) satisfies PageLoad;
