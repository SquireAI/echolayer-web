import { EntityRelationshipNames, EntityTypes, type SelectedStore, type TeamStore, type ComponentEntity, type RelationEntity } from "$lib/types";
import { derived } from "svelte/store";

export const getOwners = (currentEntityStore: SelectedStore, teamStore: TeamStore) => derived([currentEntityStore], ([currentEntityStore]) => {
    if(currentEntityStore.entity === undefined || [EntityTypes.MEMBER, EntityTypes.TEAM].includes(currentEntityStore.entity.type)) {
        return [];
    }
    return (currentEntityStore.entity as ComponentEntity)?.relations?.filter(
        (relation: RelationEntity) => relation.relationshipName === EntityRelationshipNames.OWNED_BY
    ).map((relation: RelationEntity) => relation.target) || [];
});