import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { UserInvitationStore, StoreUserInvitationsEntity, Invitation } from '../types';

export const USER_INVITATION_STORE_NAME = 'user-invitations';

let initialValue: StoreUserInvitationsEntity;
const storageValue: string | undefined = browser
	? localStorage.getItem(USER_INVITATION_STORE_NAME) ?? undefined
	: undefined;

if (browser && storageValue) {
	initialValue = JSON.parse(storageValue);
	if (!initialValue.entity) {
		initialValue.entity = [];
	}
} else {
	initialValue = { loading: false, error: false, entity: [] };
}

const createUserInvitationsStore = (): UserInvitationStore => {
	const { set, update, subscribe } = writable<StoreUserInvitationsEntity>(initialValue);
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

const store = createUserInvitationsStore();
store.subscribe(
	(value) => browser && localStorage.setItem(USER_INVITATION_STORE_NAME, JSON.stringify(value))
);
export default store;
