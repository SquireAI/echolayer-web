import { derived, get, writable, type Readable } from "svelte/store";
import type { GraphedEntity, SelectedStore, StoreSelectedEntity } from "../types";
import selectedEntityStore from "./selected-store";

export const ENTITY_DETAILS_STORE_NAME = "entity-details";

const initialValue = { loading: false, error: false, entity: undefined };
const currentEntityDetailsStore = writable<StoreSelectedEntity>(initialValue);

/**
 * This derived store is responsible to maintaining the last selected store by the user.
 * If the user deselects a node, it will remember whatever the last selected node as
 */
const derivedSelectedStore: Readable<StoreSelectedEntity> = derived(
	selectedEntityStore,
	($selectedEntityStore) => {
		if ($selectedEntityStore.entity !== undefined) {
			currentEntityDetailsStore.set({ ...initialValue, entity: $selectedEntityStore.entity });
		}
		return get(currentEntityDetailsStore)
	});

const { set, update } = currentEntityDetailsStore;
const { subscribe } = derivedSelectedStore;
const createStore = (): SelectedStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setEntity: (entity?: GraphedEntity) => set({ loading: false, error: false, entity })
	}
};

const store = createStore();
export default store;
