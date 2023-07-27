import { getHttpContext, type httpContext } from "$lib/http/context";
import type { LayoutServerLoad } from "./$types";
import {authRequired, flagRequired, orgRequired} from "$lib/utils/access";
import { PUBLIC_DISCOVERY_ENABLED } from "$env/static/public";

export const load = (async ({ fetch, cookies }) => {
	// Check if flag enabled
	flagRequired(PUBLIC_DISCOVERY_ENABLED);

	// Get tokens from cookies
	const context: httpContext = getHttpContext(fetch, cookies);

	// Check if user is authenticated
	await authRequired(context);

	// TODO: How to check orgRequired now?
	// Check if user has an organization
	const org = await orgRequired(context);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
	}
}) satisfies LayoutServerLoad;
