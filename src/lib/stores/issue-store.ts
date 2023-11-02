import { writable } from 'svelte/store';
import type { Issue, IssueStore, StoreIssueEntity } from '../types';

export const ISSUE_STORE_NAME = 'issue';

const initialValue = { loading: false, error: false, entity: undefined };
const issueStore = writable<StoreIssueEntity>(initialValue);

const { set, subscribe, update } = issueStore;

const createStore = (): IssueStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setIssues: (entity: Issue[]) => set({ loading: false, error: false, entity }),
		updateIssue: (entity: Issue) =>
			update((existing) => ({
				...existing,
				entity: existing.entity?.filter((e) => e.publicId !== entity.publicId).concat(entity)
			}))
	};
};

const store = createStore();
export default store;
