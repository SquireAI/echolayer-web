import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({
}): Promise<void> => {
	// Page no longer exists - redirect
	throw redirect(301, '/');
}) satisfies PageLoad;
