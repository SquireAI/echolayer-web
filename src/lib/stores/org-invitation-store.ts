import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Invitation, OrgInvitationStore, StoreOrgInvitationsEntity } from '../types';

export const ORG_INVITATION_STORE_NAME = 'org-invitations';

let initialValue: StoreOrgInvitationsEntity;
const storageValue: string | undefined = browser
	? localStorage.getItem(ORG_INVITATION_STORE_NAME) ?? undefined
	: undefined;

if (browser && storageValue) {
	initialValue = JSON.parse(storageValue);
	if (!initialValue.entity) {
		initialValue.entity = [];
	}
} else {
	initialValue = { loading: false, error: false, entity: [] };
}

const createOrgInvitationsStore = (): OrgInvitationStore => {
	const { set, update, subscribe } = writable<StoreOrgInvitationsEntity>(initialValue);
	return {
		update,
		subscribe,
		set,
		setInvitations: (invitations: Invitation[]) =>
			set({ loading: false, error: false, entity: invitations }),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError }))
	};
};

const store = createOrgInvitationsStore();
store.subscribe(
	(value) => browser && localStorage.setItem(ORG_INVITATION_STORE_NAME, JSON.stringify(value))
);
export default store;
