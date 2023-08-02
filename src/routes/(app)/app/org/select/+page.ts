import { PUBLIC_DISCOVERY_ENABLED, PUBLIC_MULTI_ORG_ENABLED } from "$env/static/public";
import { DISCOVERY_HOME_PATH, ORGS_PATH } from "$lib/utils/paths";
import { redirect } from "$lib/utils/redirects";
import type { PageLoad } from "./$types";


export const load = (async (): Promise<void> => {
	if(PUBLIC_MULTI_ORG_ENABLED !== "true" && PUBLIC_DISCOVERY_ENABLED !== "true") {
        const redirectPath = PUBLIC_DISCOVERY_ENABLED ? DISCOVERY_HOME_PATH: ORGS_PATH;
        throw redirect(redirectPath);
    }
}) satisfies PageLoad;