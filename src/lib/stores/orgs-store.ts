import { writable } from "svelte/store";
import { browser } from '$app/environment';
import type { Organization, StoreOrganizationsEntity, OrganizationStore, OrganizationsStore } from "../types";

export const ORGS_STORE_NAME = "orgs";

let initialValue: StoreOrganizationsEntity;
const storageValue: string | undefined = browser ? localStorage.getItem(ORGS_STORE_NAME) ?? undefined : undefined;

if (browser && storageValue) {
	initialValue = JSON.parse(storageValue);
} else {
	initialValue = { loading: false, error: false };
}

const createOrgsStore = (): OrganizationsStore => {
	const { set, update, subscribe } = writable<StoreOrganizationsEntity>(initialValue);
	return {
		update,
		subscribe,
		set,
		setOrganizations: (entity: Organization[]) => set({ loading: false, error: false, entity }),
		updateOrganizations: (entity: Organization[]) => update((existing) => ({ ...existing, entity })),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
	}
}

const store = createOrgsStore();
store.subscribe((value) => browser && localStorage.setItem(ORGS_STORE_NAME, JSON.stringify(value)));

export default store;
