import { writable, derived, type Readable } from 'svelte/store';
import type {
	StoreOrganizationEntity,
	Organization,
	SelectedOrganizationStore,
	StorePublicId
} from '../types';
import organizationsStore from './orgs-store';

export const SELECTED_ORG_STORE_NAME = 'selectedOrg';

const initialValue = { loading: false, error: false, entity: undefined };
const orgStore = writable<StorePublicId>(initialValue);

const derivedOrgStore: Readable<StoreOrganizationEntity> = derived(
	[orgStore, organizationsStore],
	([$selectedOrg, $orgsStore]) => {
		if (!$selectedOrg.entity || !$orgsStore.entity) {
			return initialValue;
		}
		const derivedSelected: Organization | undefined = $orgsStore.entity.find(
			(entity: Organization) => {
				return entity.publicId === $selectedOrg?.entity;
			}
		);

		return {
			...initialValue,
			entity: derivedSelected
		};
	}
);

const { set, update } = orgStore;
const { subscribe } = derivedOrgStore;
const createStore = (): SelectedOrganizationStore => {
	return {
		subscribe,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setOrganization: (publicId: string) => set({ loading: false, error: false, entity: publicId }),
		updateOrganization: (publicId: string) =>
			set({ loading: false, error: false, entity: publicId })
	};
};

const store = createStore();
export default store;
