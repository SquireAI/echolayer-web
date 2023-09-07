import { createDefaultContext } from '$lib/http/context';
import type { LayoutLoad } from './$types';
import { createOrgInviteService } from '$lib/invitation/orgInvite.service';
import { createRelationsService } from '$lib/relations/relations.service';

export const load = (async ({ fetch, parent, data }) => {
	// we're getting the xsrf header from the parent (+layout.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl } = data;
	const context = createDefaultContext(fetch, baseHeaders, baseUrl);

	const inviteService = createOrgInviteService(context);
	const relationsService = createRelationsService(context);

	return {
		baseHeaders: context.baseHeaders,
		baseUrl: context.baseUrl,
		inviteService,
		relationsService
	};
}) satisfies LayoutLoad;
