import { writable, derived } from "svelte/store";
import type { Component, ComponentEntity, OriginComponentEntity, ComponentStore, OriginComponentStore } from "../types";

export const COMPONENT_STORE_NAME = "component";

const createComponentStore = (): ComponentStore => {
	const componentStore = writable<ComponentEntity>({ loading: false, error: false, entity: undefined });
	const originComponentStore = writable<OriginComponentEntity>({ loading: false, error: false, entity: undefined });

	return {
		update: componentStore.update,
		subscribe: componentStore.subscribe,
		clear: () => componentStore.set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => componentStore.update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => componentStore.update((existing) => ({ ...existing, error: isError })),
		setComponents: (entity: Component[]) => componentStore.set({ loading: false, error: false, entity }),
		setOrigin: (entity: Component) => originComponentStore.set({ loading: false, error: false, entity }),
		origin: derived(
				[componentStore, originComponentStore],
				([$componentStore, $originComponentStore]) => {
					if (!$componentStore.entity || !$originComponentStore.entity) return undefined;
					return $componentStore.entity.find((component: Component) => {
						return component.id === $originComponentStore?.entity?.id;
					});
				})
	}
};

const componentStore = createComponentStore();
export default componentStore;
