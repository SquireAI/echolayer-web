import type { Organization } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class OrganizationApi extends BaseApi<Organization> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.organization;
	}
}
