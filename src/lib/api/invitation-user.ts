import type { Invitation } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class InvitationUserApi extends BaseApi<Invitation> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.invitationUser;
	}
}
