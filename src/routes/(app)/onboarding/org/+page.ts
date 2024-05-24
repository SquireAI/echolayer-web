import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import { OrganizationApi } from '$lib/api/organization';
import type { Organization, Profile } from '$lib/types';
import { ProfileApi } from '$lib/api/profile';

export type Handlers = {
	createOrgHandler: (name: string) => Promise<Organization>;
	getProfile: () => Promise<Profile>;
	org?: Organization;
};

export const load = (async ({ parent, fetch, data }): Promise<Handlers> => {
	await parent();
	const { baseHeaders, baseUrl, org } = data;

	async function createOrgHandler(name: string): Promise<Organization> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new OrganizationApi(context).create({ name });
	}

	async function getProfile(): Promise<Profile> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new ProfileApi(context).get('');
	}

	const handlers = {
		createOrgHandler,
		getProfile,
		org
	};

	return { ...handlers };
}) satisfies PageLoad;
