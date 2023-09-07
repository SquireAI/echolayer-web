import { AuthApi } from '$lib/api/auth';
import {
	CREATE_ORG_PATH,
	INVALIDATED_SIGN_IN_PATH,
	ORGS_SELECT_PATH,
	ORGS_SELECT_PATH_WITH_INVALIDATE
} from './paths';
import type { Organization, User } from '$lib/types';
import { OrganizationApi } from '$lib/api/organization';
import { error, redirect } from '@sveltejs/kit';
import type { HttpError } from '@sveltejs/kit';
import { ErrorMessageTypes } from '$lib/error';
import type { httpContext } from '$lib/http/context';
import { ORGANIZATION_ID_HEADER_NAME } from '$lib/constants';
import { InvitationUserApi } from '$lib/api/invitation-user';

// User authentication required
export const authRequired = async (context: httpContext): Promise<User> => {
	// Check if user is authenticated
	try {
		return await new AuthApi(context).checkAuth();
	} catch (err) {
		throw redirect(307, INVALIDATED_SIGN_IN_PATH);
	}
};

// Organization required
export const orgRequired = async (context: httpContext): Promise<Organization> => {
	let orgs: Organization[] = [];
	try {
		orgs = orgs.concat(await new OrganizationApi(context).list());
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw redirect(307, INVALIDATED_SIGN_IN_PATH);
		} else {
			throw error(404, { message: ErrorMessageTypes.GENERIC });
		}
	}

	// Redirect to create a new org if none exist
	if (orgs.length < 1) {
		const invitationsToOrg = await new InvitationUserApi(context).list();
		if (invitationsToOrg.length == 0) {
			throw redirect(307, CREATE_ORG_PATH);
		}
	}
	// If they haven't selected an org, redirect them to the selection page
	if (!context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]) {
		throw redirect(307, ORGS_SELECT_PATH);
	}

	const selectedOrg = orgs.find(
		(org) => org.publicId === context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]
	);

	// Their selection isn't valid, so we'll redirect them to pick a new selection.
	if (!selectedOrg) {
		throw redirect(307, ORGS_SELECT_PATH_WITH_INVALIDATE);
	}

	return selectedOrg;
};

// Flag required
export const flagRequired = (
	envVariable: string | null = null,
	redirectPath: string | null = null
): void => {
	if (!envVariable || envVariable !== 'true')
		throw redirect(307, redirectPath || INVALIDATED_SIGN_IN_PATH);
};
