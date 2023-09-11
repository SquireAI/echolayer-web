import { building } from '$app/environment';
import { getHttpContext } from '$lib/http/context';
import { authRequired, orgRequired } from '$lib/utils/access';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Workaround due to: https://github.com/sveltejs/kit/issues/9386
	if (building) {
		const response = await resolve(event);
		return response;
	}

	const context = getHttpContext(event.fetch, event.cookies);

	if (event.url.pathname.startsWith('/sign-in')) {
		return await resolve(event);
	} else {
		event.locals.user = await authRequired(context);
		if (event.url.pathname.startsWith('/org/select')) {
			return await resolve(event);
		}
		event.locals.org = await orgRequired(context);
		return await resolve(event);
	}
};
