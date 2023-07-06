import { writable } from "svelte/store";
import type { StoreComponentEntity, StoreComponentEntity, ComponentStore } from "../types";
import { browser } from "$app/environment";

export let COMPONENT_STORE_NAME = "component";

let initialValue: StoreComponentEntity = { loading: false, error: false };
let storageValue: string | undefined = undefined;

if (browser) {
	storageValue = localStorage.getItem(COMPONENT_STORE_NAME) ?? undefined;
}

if (storageValue !== undefined) {
	initialValue = JSON.parse(storageValue)
}

const createComponentStore = (): ComponentStore => {
	const { set, update, subscribe } = writable<StoreComponentEntity >({ loading: false, error: false });
	return {
		update,
		subscribe,
		setComponents: (entity: StoreComponentEntity[]) => set({ loading: false, error: false, entity }),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
	}
};

const componentStore = createComponentStore();

componentStore.subscribe((value) => browser && localStorage.setItem(COMPONENT_STORE_NAME, JSON.stringify(value)));

export default componentStore;
