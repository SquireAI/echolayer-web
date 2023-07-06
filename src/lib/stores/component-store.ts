import { writable, derived } from "svelte/store";
import type {ComponentEntity, StoreComponentEntity, ComponentStore} from "../types";

export const COMPONENT_STORE_NAME = "component";

const initialValue = { loading: false, error: false, entity: undefined, selected: undefined };
const componentStore = writable<StoreComponentEntity>(initialValue);
const originComponentStore = derived(
	[componentStore],
	([$componentStore]) => {
		if (!$componentStore.entity || !$componentStore.selected) return undefined;
		return $componentStore.entity.find((component: ComponentEntity) => {
			return component.id === $componentStore?.selected?.id;
		});
	});

const createStore = (): ComponentStore => {
	return {
		update: componentStore.update,
		subscribe: componentStore.subscribe,
		clear: () => componentStore.set(initialValue),
		setLoading: (isLoading: boolean) => componentStore.update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => componentStore.update((existing) => ({ ...existing, error: isError })),
		setComponents: (entity: ComponentEntity[]) => componentStore.set({ loading: false, error: false, entity }),
		setOrigin: (component: ComponentEntity) => componentStore.update((existing) => ({ ...existing, origin: component })),
		origin: originComponentStore
	}
};

const store = createStore();
export default store;
