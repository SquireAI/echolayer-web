import { writable } from "svelte/store";
import type { Organization, OrganizationEntity, OrganizationStore } from "../types";

export const createOrgStore = (): OrganizationStore => {
	const { set, update, subscribe } = writable<OrganizationEntity >({ loading: false, error: false });
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