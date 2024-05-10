import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import type { Profile } from '$lib/types';
import { ProfileApi } from '$lib/api/profile';

export type Handlers = {
	createProfile: (profile: Profile) => Promise<Profile>;
	getProfile: () => Promise<Profile>;
};

export const load = (async ({ parent, fetch, data }): Promise<Handlers> => {
	await parent();
	const { baseHeaders, baseUrl } = data;

	async function createProfile(profile: Profile): Promise<Profile> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new ProfileApi(context).create(profile);
	}

	async function getProfile(): Promise<Profile> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new ProfileApi(context).get('');
	}

	const handlers = {
		createProfile,
		getProfile
	};

	return { ...handlers };
}) satisfies PageLoad;
