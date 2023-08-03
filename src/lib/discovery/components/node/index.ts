import { EntityTypes, type BaseEntity, type ComponentEntity, type TeamEntity } from "$lib/types";
import { selectedStore } from "$lib/stores";

type NodeSize = {
	width: number;
	height: number;
};

const nodeDimensionsByType = new Map<BaseEntity["type"], NodeSize>([
	[EntityTypes.COMPONENT, { width: 240, height: 104 }],
	[EntityTypes.TEAM, { width: 240, height: 120 }],
]);

export function setSelectedNode(entity: TeamEntity|ComponentEntity): void {
	selectedStore.setEntity(entity);
}

export function clearSelectedNode(): void {
	selectedStore.clear();
}

export function toggleSelectedComponent(component: TeamEntity|ComponentEntity, selected: boolean): void {
	return setSelectedNode(component);
}

export function getNodeSize(type: BaseEntity["type"]): NodeSize {
	if (!nodeDimensionsByType.has(type) || nodeDimensionsByType.get(type) === undefined) {
		throw new Error("Invalid node ComponentType");
	}
	// telling the compiler not to worry about the possible null value as we already checked above 
	// that the key exists and we know we're not modifying the original map between checking for the
	// value and accessing it.
	return nodeDimensionsByType.get(type)!;
}
