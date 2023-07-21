import type { PageServerLoad } from './$types';
import {redirect} from '@sveltejs/kit';
import {ORGS_PATH} from "$lib/utils/paths";

export const load = (async (): Promise<void> => {
    // Send user to org page
    throw redirect(307, ORGS_PATH);
}) satisfies PageServerLoad;
