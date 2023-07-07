import { writable, derived, type Readable } from "svelte/store";
import type {ComponentEntity, StoreComponentEntity, ComponentStore} from "../types";

export const COMPONENT_STORE_NAME = "component";

const initialValue = { loading: false, error: false, entity: undefined, selected: undefined };
const componentStore = writable<StoreComponentEntity>(initialValue);
const originComponentStore: Readable<ComponentEntity | undefined> = derived(
	[componentStore],
	([$componentStore]) => {
		if (!$componentStore.entity || !$componentStore.selected) return undefined;
		return $componentStore.entity.find((component: ComponentEntity) => {
			return component.publicId === $componentStore?.selected?.publicId;
		});
	});

	const { set, subscribe, update } = componentStore; 
const createStore = (): ComponentStore => {
	return {
		update,
		subscribe,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setComponents: (entity: ComponentEntity[]) => set({ loading: false, error: false, entity }),
		setOrigin: (component: ComponentEntity) => update((existing) => ({ ...existing, selected: component })),
		origin: originComponentStore
	}
};

const store = createStore();
export default store;
