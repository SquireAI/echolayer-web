import { selectedStore } from "$lib/stores";
import { EntityTypes, type GraphedEntity } from "$lib/types";

type NodeSize = {
	width: number;
	height: number;
};

const nodeDimensionsByType = new Map<GraphedEntity["type"], NodeSize>([
	[EntityTypes.COMPONENT, { width: 240, height: 104 }],
	[EntityTypes.TEAM, { width: 240, height: 120 }],
]);

export function setSelectedNode(entity: GraphedEntity): void {
	selectedStore.setEntity(entity);
}

export function clearSelectedNode(): void {
	selectedStore.clear();
}

export function toggleSelectedComponent(component: GraphedEntity, selected: boolean): void {
	return setSelectedNode(component);
}

export function getNodeSize(type: GraphedEntity["type"]): NodeSize {
	if (!nodeDimensionsByType.has(type) || nodeDimensionsByType.get(type) === undefined) {
		throw new Error("Invalid node ComponentType");
	}
	// telling the compiler not to worry about the possible null value as we already checked above 
	// that the key exists and we know we're not modifying the original map between checking for the
	// value and accessing it.
	return nodeDimensionsByType.get(type)!;
}
