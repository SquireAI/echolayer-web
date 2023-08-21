import { InvitationOrgApi } from '$lib/api/invitaion-org';
import { OrganizationApi } from '$lib/api/organization';
import { createDefaultContext, type httpContext } from '$lib/http/context';
import type { Invitation, Organization } from '$lib/types';
import type { LayoutLoad } from './$types';

export type RootPageData = {
	getOrgInvitations: () => Promise<Invitation[]>;
	createOrgInvitation: (email: string) => Promise<Invitation>;
	deleteOrgInvitation: (publicId: string) => Promise<void>;
};

export const load = (async ({ fetch, data }): Promise<RootPageData> => {
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl } = data;
	const context: httpContext = createDefaultContext(fetch, baseHeaders, baseUrl);

	const orgInvitationsApi = new InvitationOrgApi(context);

	async function createOrgHandler(orgName: string): Promise<Organization> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new OrganizationApi(context).create({ name: orgName });
	}
	return {
		...data,
		getOrgInvitations: async () => await orgInvitationsApi.list({ pending: true }),
		createOrgInvitation: async (email: string) =>
			await orgInvitationsApi.create({ invitedEmail: email }),
		deleteOrgInvitation: async (publicId: string) => await orgInvitationsApi.delete(publicId)
	};
}) satisfies LayoutLoad;
