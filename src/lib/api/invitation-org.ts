import type { Invitation } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class InvitationOrgApi extends BaseApi<Invitation> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.invitationOrg;
	}
}
