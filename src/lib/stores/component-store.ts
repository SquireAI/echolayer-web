import { writable } from 'svelte/store';
import type { ComponentEntity, StoreComponentEntity, ComponentStore } from '../types';

export const COMPONENT_STORE_NAME = 'component';

const initialValue = { loading: false, error: false, entity: undefined };
const componentStore = writable<StoreComponentEntity>(initialValue);

const { set, subscribe, update } = componentStore;

const createStore = (): ComponentStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setComponents: (entity: ComponentEntity[]) => set({ loading: false, error: false, entity })
	};
};

const store = createStore();
export default store;
