import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import type { Profile } from '$lib/types';
import { ProfileApi } from '$lib/api/profile';

interface PageData {
	createProfile: (context: any, profile: Profile) => Promise<Profile>;
	getProfile: () => Promise<Profile>;
}

export const load = (async ({ parent, fetch, data }): Promise<PageData> => {
	await parent();
	const { baseHeaders, baseUrl } = data;

	async function createProfile(profile: Profile): Promise<Profile> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		const savedProfile = await new ProfileApi(context).create(profile);

		// Subscribe to email list
		try {
			await fetch('/api/email-subscribe', {
				method: 'POST',
				body: JSON.stringify(profile)
			});
		} catch (err) {
			console.log('Failed to subscribe to email list');
		}

		return savedProfile;
	}

	async function getProfile(): Promise<Profile> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new ProfileApi(context).get('');
	}

	return {
		createProfile,
		getProfile
	};
}) satisfies PageLoad;
