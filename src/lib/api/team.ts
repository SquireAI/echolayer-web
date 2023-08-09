import type { TeamEntity } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class TeamApi extends BaseApi<TeamEntity> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.team;
	}
}
