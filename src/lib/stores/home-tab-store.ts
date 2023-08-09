import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { HomeTabStore, StoreHomeTabIndex } from '../types';

export const HOME_TAB_STORE_NAME = 'home-tab';

let initialValue: StoreHomeTabIndex;
const storageValue: string | undefined = browser
	? localStorage.getItem(HOME_TAB_STORE_NAME) ?? undefined
	: undefined;

if (browser && storageValue) {
	initialValue = JSON.parse(storageValue);
	if (!initialValue.entity) {
		initialValue.entity = 0;
	}
} else {
	initialValue = { loading: false, error: false, entity: 0 };
}

const createHomeTabStore = (): HomeTabStore => {
	const { set, update, subscribe } = writable<StoreHomeTabIndex>(initialValue);
	return {
		update,
		subscribe,
		set,
		setHomeTabIndex: (index: number) => set({ loading: false, error: false, entity: index }),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError }))
	};
};

const store = createHomeTabStore();
store.subscribe(
	(value) => browser && localStorage.setItem(HOME_TAB_STORE_NAME, JSON.stringify(value))
);
export default store;
