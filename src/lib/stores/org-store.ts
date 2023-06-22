import { writable } from "svelte/store";
import { browser } from '$app/environment';
import type { Organization, OrganizationEntity, OrganizationStore } from "../types";

export const ORG_STORE_NAME = "org";

let initialValue: OrganizationEntity;
const storageValue: string | undefined = browser ? localStorage.getItem(ORG_STORE_NAME) ?? undefined : undefined;

if (browser && storageValue) {
	initialValue = JSON.parse(storageValue);
} else {
	initialValue = { loading: false, error: false };
}

const createOrgStore = (): OrganizationStore => {
	const { set, update, subscribe } = writable<OrganizationEntity>(initialValue);
	return {
		update,
		subscribe,
		setOrganization: (entity: Organization) => set({ loading: false, error: false, entity }),
		updateOrganization: (entity: Organization) => update((existing) => ({ ...existing, entity })),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
	}
}

const store = createOrgStore();
store.subscribe((value) => browser && localStorage.setItem(ORG_STORE_NAME, JSON.stringify(value)));

export default store;
