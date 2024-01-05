import type { Location } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';
import _ from 'lodash';

export class LocationApi extends BaseApi<Location> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.location;
	}
}
