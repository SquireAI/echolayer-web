import { EntityRelationshipNames, EntityTypes, type EntityRelationshipStore, type RelationGraphEntity, type SelectedStore, type TeamEntity, type TeamStore } from "$lib/types";
import { derived } from "svelte/store";

export const getTeamOwners = (currentEntityStore: SelectedStore, teamStore: TeamStore, entityRelationshipStore: EntityRelationshipStore) => derived([currentEntityStore, teamStore, entityRelationshipStore], ([currentEntityStore, teamStore, entityRelationshipStore]) => {
    if(currentEntityStore.entity === undefined || [EntityTypes.MEMBER, EntityTypes.TEAM].includes(currentEntityStore.entity.type)) {
        return [];
    }

    const ownerIds = entityRelationshipStore.entity?.filter(
        (relation: RelationGraphEntity) => relation.sourcePublicId === currentEntityStore?.entity?.publicId && relation.relationshipName === EntityRelationshipNames.OWNED_BY 
    ).map((relation: RelationGraphEntity) => relation.targetPublicId) || [];
    return teamStore.entity?.filter((team: TeamEntity) => ownerIds.includes(team.publicId)) || [];
});