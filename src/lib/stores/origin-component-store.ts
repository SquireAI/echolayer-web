import { writable, derived, type Readable } from "svelte/store";
import type { ComponentEntity, StoreOriginComponentEntity, OriginComponentStore } from "../types";
import ComponentStore from "./component-store";

export const ORIGIN_COMPONENT_STORE_NAME = "origin-component";

const initialValue = { loading: false, error: false, entity: undefined };
const originComponentStore = writable<StoreOriginComponentEntity>(initialValue);

const derivedOriginComponentStore: Readable<ComponentEntity | undefined> = derived(
	[originComponentStore, ComponentStore],
	([$originComponentStore, $ComponentStore]) => {
		if (!$originComponentStore.entity || !$ComponentStore.entity) return undefined;
		const derivedComponent: ComponentEntity | undefined = $ComponentStore.entity.find((component: ComponentEntity) => {
			return Number(component.publicId) === Number($originComponentStore?.entity?.publicId);
		});

		return {
			...initialValue,
			...derivedComponent,
		};
	});

const { set, update } = originComponentStore;
const { subscribe } = derivedOriginComponentStore;
const createStore = (): OriginComponentStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setComponent: (entity: ComponentEntity) => set({ loading: false, error: false, entity })
	}
};

const store = createStore();
export default store;
