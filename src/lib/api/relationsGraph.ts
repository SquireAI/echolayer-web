import type { RelationGraphEntity } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class RelationsGraphApi extends BaseApi<RelationGraphEntity> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.relationsGraph;
	}
}
