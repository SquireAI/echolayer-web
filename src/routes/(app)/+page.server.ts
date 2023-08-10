import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { HOME_PATH, ORGS_PATH } from '$lib/utils/paths';
import { PUBLIC_DISCOVERY_ENABLED } from '$env/static/public';

export const load = (async (): Promise<void> => {
	// Send user to org page
	throw redirect(307, PUBLIC_DISCOVERY_ENABLED === 'true' ? HOME_PATH : ORGS_PATH);
}) satisfies PageServerLoad;
