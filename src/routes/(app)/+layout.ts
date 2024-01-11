import { createDefaultContext } from '$lib/http/context';
import type { LayoutLoad } from './$types';
import { authRequired } from '$lib/utils/access';
import { createOrgInviteService } from '$lib/services/orgInvite.service';
import { createRelationsService } from '$lib/relations/relations.service';
import { createIssueService } from '$lib/services/issue.service';
import { ContributionApi } from '$lib/api/contribution';
import { LocationOwnersApi } from '$lib/api/location-owners';

export const load = (async ({ fetch, parent, data }) => {
	await parent();
	// we're getting the xsrf header from the parent (+layout.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl } = data;
	const context = createDefaultContext(fetch, baseHeaders, baseUrl);

	// Initialize services
	const inviteService = createOrgInviteService(context);
	const relationsService = createRelationsService(context);
	const issueService = createIssueService(context);

	// Initialize apis
	const contributionApi = new ContributionApi(context);
	const locationOwnersApi = new LocationOwnersApi(context);

	return {
		inviteService,
		relationsService,
		apis: {
			contributionApi,
			locationOwnersApi
		},
		services: {
			issueService
		}
	};
}) satisfies LayoutLoad;
