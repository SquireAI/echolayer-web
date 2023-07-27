import type { PageServerLoad } from './$types';
import {redirect} from '@sveltejs/kit';
import {ORGS_INDEX_PATH} from "$lib/utils/paths";

export const load = (async (): Promise<void> => {
    // Send user to org page
    throw redirect(307, ORGS_INDEX_PATH);
}) satisfies PageServerLoad;
