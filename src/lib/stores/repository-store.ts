import { writable } from 'svelte/store';
import type { Repository, RepositoryStore, StoreRepositoryEntity } from '../types';

export const REPOSITORY_STORE_NAME = 'repository';

const initialValue = { loading: false, error: false, entity: undefined };
const repositoryStore = writable<StoreRepositoryEntity>(initialValue);

const { set, subscribe, update } = repositoryStore;

const createStore = (): RepositoryStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setRepositories: (entity: Repository[]) => set({ loading: false, error: false, entity })
	};
};

const store = createStore();
export default store;
