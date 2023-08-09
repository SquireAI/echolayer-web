import type { RelationEntity } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class RelationsApi extends BaseApi<RelationEntity> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.relations;
	}
}
