import type { Location, LocationOwnersResult } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';
import _ from 'lodash';

export class LocationOwnersApi extends BaseApi<Location> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.locationOwners;
	}

	public async getOwners(path: string): Promise<LocationOwnersResult> {
		return this.list({ path });
	}
}
