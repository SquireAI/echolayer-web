import { writable, derived } from "svelte/store";
import type {Component, ComponentEntity, ComponentStore} from "../types";

export const COMPONENT_STORE_NAME = "component";

const componentStore = writable<ComponentEntity>({ loading: false, error: false, entity: undefined, selected: undefined });
const originComponentStore = derived(
	[componentStore],
	([$componentStore]) => {
		if (!$componentStore.entity || !$componentStore.selected) return undefined;
		return $componentStore.entity.find((component: Component) => {
			return component.id === $componentStore?.selected?.id;
		});
	});

const createStore = (): ComponentStore => {
	return {
		update: componentStore.update,
		subscribe: componentStore.subscribe,
		clear: () => componentStore.set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => componentStore.update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => componentStore.update((existing) => ({ ...existing, error: isError })),
		setComponents: (entity: Component[]) => componentStore.set({ loading: false, error: false, entity }),
		setOrigin: (component: Component) => componentStore.update((existing) => ({ ...existing, origin: component })),
		origin: originComponentStore
	}
};

const store = createStore();
export default store;
