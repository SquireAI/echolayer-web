import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { User, StoreUserEntity, UserStore } from "../types";

export const USER_STORE_NAME = "user";

let initialValue: StoreUserEntity;
const storageValue: string | undefined = browser ? localStorage.getItem(USER_STORE_NAME) ?? undefined : undefined;
if (browser && storageValue) {
	initialValue = JSON.parse(storageValue)
} else {
	initialValue = { loading: false, error: false };
}

const createUserStore = (): UserStore => {
	const { set, update, subscribe } = writable<StoreUserEntity>(initialValue);
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

const userStore = createUserStore();

userStore.subscribe((value) => browser && localStorage.setItem(USER_STORE_NAME, JSON.stringify(value)));


export default userStore;
