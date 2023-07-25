import type { BaseEntity } from "$lib/types";
import { selectedStore } from "$lib/stores";

export function setSelectedNode(entity: BaseEntity): void {
	selectedStore.setEntity(entity);
}

export function clearSelectedNode(): void {
	selectedStore.clear();
}

export function toggleSelectedComponent(component: BaseEntity, selected: boolean): void {
	if (selected) {
		// the setTimeout is needed to make sure the next selected node is set AFTER the previously selected node is toggled off
		return void setTimeout(() => setSelectedNode(component), 100);
	}
	return clearSelectedNode();
}