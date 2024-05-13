import type { Profile } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class ProfileApi extends BaseApi<Profile> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.profile;
	}
}
