import { RelationsApi } from '$lib/api/relations';
import type { httpContext } from '$lib/http/context';
import type { Invitation, RelationEntity, RelationType, RelationUpdateParams } from '$lib/types';

export const RELATIONS_SERVICE_CONTEXT_NAME = 'service.relations';

export interface RelationsService {
	updateRelations: (
		publicId: string,
		sourcePublicId?: string,
		targetPublicId?: string
	) => Promise<RelationEntity[]>;
	createRelations: (
		sourcePublicId: string,
		targetPublicId: string,
		relationshipName: RelationType
	) => Promise<RelationEntity>;
}

export const createRelationsService = (context: httpContext): RelationsService => {
	const relationsApi = new RelationsApi(context);
	return {
		updateRelations: function (
			publicId: string,
			sourcePublicId?: string,
			targetPublicId?: string
		): Promise<RelationEntity[]> {
			return relationsApi.updateRelations(publicId, sourcePublicId, targetPublicId);
		},
		createRelations: function (
			sourcePublicId: string,
			targetPublicId: string,
			relationshipName: RelationType
		): Promise<RelationEntity> {
			return relationsApi.create({ sourcePublicId, targetPublicId, relationshipName });
		}
	};
};
