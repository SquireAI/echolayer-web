import { AuthApi } from '$lib/api/auth';
import { createDefaultContext } from '$lib/http/context';
import { clearStores } from '$lib/stores';
import { INVALIDATE_QUERY_PARAMETER_NAME } from '$lib/utils/paths';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	if (url.searchParams.has(INVALIDATE_QUERY_PARAMETER_NAME)) {
		clearStores();
		try {
			await new AuthApi(createDefaultContext()).logout();
		} catch (error) {
			// Do nothing as we only wanted to clear errors.
			// If we got an error here it means the client or server
			// cannot make network requests
		}
	}
}) satisfies PageLoad;
