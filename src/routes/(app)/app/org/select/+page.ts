import { PUBLIC_DISCOVERY_ENABLED, PUBLIC_MULTI_ORG_ENABLED } from "$env/static/public";
import { OrganizationApi } from "$lib/api/organization";
import { UserApi } from "$lib/api/user";
import { ORGANIZATION_ID_COOKIE_NAME } from "$lib/constants";
import { ErrorMessageTypes } from "$lib/error";
import { createDefaultContext } from "$lib/http/context";
import type { Organization, User } from "$lib/types";
import { authRequired, orgRequired } from "$lib/utils/access";
import { CREATE_ORG_PATH, DISCOVERY_HOME_PATH, INVALIDATED_SIGN_IN_PATH, ORGS_PATH } from "$lib/utils/paths";
import { } from "$lib/utils/redirects";
import type { PageLoad } from "./$types";
import { type HttpError, error, redirect  } from '@sveltejs/kit';

export interface OrgsLayoutLoad {
	orgs: Organization[];
    /**
     * Their currently selected org if it exists.
     */
    org?: Organization;
	user: User;
}

export const load = (async ({ parent, fetch, data }): Promise<OrgsLayoutLoad> => {
	if(PUBLIC_MULTI_ORG_ENABLED !== "true" && PUBLIC_DISCOVERY_ENABLED !== "true") {
        const redirectPath = PUBLIC_DISCOVERY_ENABLED ? DISCOVERY_HOME_PATH: ORGS_PATH;
        throw redirect(307, redirectPath);
    }
    const parentData = await parent();

    const { baseHeaders, baseUrl } = parentData;
    const context = createDefaultContext(fetch, baseHeaders, baseUrl);
    let orgs: Organization[] | undefined;
    let org: Organization | undefined;
    let user: User | undefined;

    await authRequired(context);
    try {
		orgs = await new OrganizationApi(context).list();
        if(orgs.length === 0) {
            throw redirect(307, CREATE_ORG_PATH);
        }

        const selectedOrgId = baseHeaders[ORGANIZATION_ID_COOKIE_NAME];
		org = selectedOrgId ? orgs.find((org) => org.publicId === selectedOrgId): undefined;
        user = await new UserApi(context).get("");
	} catch (err) {
		if ((err as HttpError).status === 401) {
			throw redirect(307, INVALIDATED_SIGN_IN_PATH);
		}
		throw error(404, { message: ErrorMessageTypes.GENERIC });
	}
	return { orgs, user, org };
}) satisfies PageLoad;