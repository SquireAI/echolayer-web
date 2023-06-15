import { writable } from "svelte/store";
import type { User, UserEntity, UserStore } from "../../types";

export const createUserStore = (): UserStore => {
	const { set, update, subscribe } = writable<UserEntity>({ loading: false, error: false });
	return {
		update,
		subscribe,
		setUser: (entity: User) => set({ loading: false, error: false, entity }),
		updateUser: (entity: User) => update((existing) => ({ ...existing, ...entity })),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
	}
}