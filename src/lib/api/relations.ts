import type { RelationEntity, RelationUpdateParams } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class RelationsApi extends BaseApi<RelationEntity> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.relations;
	}

	public async updateRelations(
		publicId: string,
		sourcePublicId?: string,
		targetPublicId?: string
	): Promise<RelationEntity[]> {
		const resp = await this.httpClient.fetchPATCH(publicId, undefined, {
			...(sourcePublicId ? { sourcePublicId } : {}),
			...(targetPublicId ? { targetPublicId } : {})
		});
		return resp.json() as Promise<RelationEntity[]>;
	}
}
