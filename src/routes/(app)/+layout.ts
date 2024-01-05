import { createDefaultContext } from '$lib/http/context';
import type { LayoutLoad } from './$types';
import { authRequired } from '$lib/utils/access';
import { createOrgInviteService } from '$lib/invitation/orgInvite.service';
import { createRelationsService } from '$lib/relations/relations.service';
import { ContributionApi } from '$lib/api/contribution';
import { LocationOwnersApi } from '$lib/api/location-owners';

export const load = (async ({ fetch, parent, data }) => {
	await parent();
	// we're getting the xsrf header from the parent (+layout.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl } = data;
	const context = createDefaultContext(fetch, baseHeaders, baseUrl);

	// Check if user is authenticated
	await authRequired(context);

	// Initialize services
	const inviteService = createOrgInviteService(context);
	const relationsService = createRelationsService(context);

	// Initialize apis
	const contributionApi = new ContributionApi(context);
	const locationOwnersApi = new LocationOwnersApi(context);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
		inviteService,
		relationsService,
		apis: {
			contributionApi,
			locationOwnersApi
		}
	};
}) satisfies LayoutLoad;
