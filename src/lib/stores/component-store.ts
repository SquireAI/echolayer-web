import { writable } from "svelte/store";
import type { Component, ComponentEntity, ComponentStore } from "../../types";

export const createComponentStore = (): ComponentStore => {
	const { set, update, subscribe } = writable<ComponentEntity >({ loading: false, error: false });
	return {
		update,
		subscribe,
		setComponents: (entity: Component[]) => set({ loading: false, error: false, entity }),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
	}
}