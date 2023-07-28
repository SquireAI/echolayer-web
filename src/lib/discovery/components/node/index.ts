import type { BaseEntity } from "$lib/types";
import { selectedStore } from "$lib/stores";
import type { ComponentType } from "svelte";
import ComponentEntityNode from "./ComponentEntityNode.svelte";
import TeamEntityNode from "./TeamEntityNode.svelte";

type NodeSize = {
	width: number;
	height: number;
};

const nodeDimensionsByType = new Map<BaseEntity["type"], NodeSize>([
	["Component", { width: 240, height: 108 }],
	["Team", { width: 240, height: 120 }],
]);

export function setSelectedNode(entity: BaseEntity): void {
	selectedStore.setEntity(entity);
}

export function clearSelectedNode(): void {
	// selectedStore.clear();
}

export function toggleSelectedComponent(component: BaseEntity, selected: boolean): void {
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
