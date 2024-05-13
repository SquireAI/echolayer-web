// import { LOOPS_API_KEY } from '$env/static/private';
import type { Profile } from '$lib/types';
import { BaseApi, ENDPOINT } from './baseApi';
import { ProfileApi } from './profile';

export class LoopsApi {
	private apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	public async subscribe(profile: Profile): Promise<Profile> {
		try {
			const { firstName, lastName, email, phone, reason } = profile;
			const sub = await fetch('https://app.loops.so/api/v1/contacts/create', {
				method: 'POST',
				headers: {
					Accept: 'application/json, */*',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.apiKey}`
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					phone,
					reason,
					source: 'User Onboarding'
				})
			});
		} catch (error) {
			console.error('Failed to add user to Loops', error);
		}

		return profile;
	}
}
