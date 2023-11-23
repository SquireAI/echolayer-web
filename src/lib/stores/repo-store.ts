import { writable } from 'svelte/store';
import type { Repo, RepoStore, StoreRepoEntity } from '../types';

export const REPO_STORE_NAME = 'repo';

const initialValue = { loading: false, error: false, entity: undefined };
const repoStore = writable<StoreRepoEntity>(initialValue);

const { set, subscribe, update } = repoStore;

const createStore = (): RepoStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setRepos: (entity: Repo[]) => set({ loading: false, error: false, entity })
	};
};

const store = createStore();
export default store;
