import type { TeamStore, StoreTeamEntity, TeamEntity } from '$lib/types';
import { writable } from 'svelte/store';

export const TEAM_STORE_NAME = 'team';

const initialStoreValue: StoreTeamEntity = { loading: false, error: false };

const createTeamStore = (): TeamStore => {
	const { set, update, subscribe } = writable<StoreTeamEntity>(initialStoreValue);
	return {
		set,
		setTeams: (entity: TeamEntity[]) => set({ loading: false, error: false, entity }),
		update,
		subscribe,
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError }))
	};
};

const teamStore = createTeamStore();

export default teamStore;
