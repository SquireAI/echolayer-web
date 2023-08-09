import type {
	RelationGraphEntity,
	EntityRelationshipStore,
	StoreEntityRelationship
} from '$lib/types';
import { writable } from 'svelte/store';

export const RELATIONS_GRAPH_STORE_NAME = 'relations-graph';

const initialStoreValue: StoreEntityRelationship = { loading: false, error: false };

const createEntityRelationshipStore = (): EntityRelationshipStore => {
	const { set, update, subscribe } = writable<StoreEntityRelationship>(initialStoreValue);
	return {
		set,
		update,
		subscribe,
		setEntityRelationships: (entity: RelationGraphEntity[]) =>
			set({ loading: false, error: false, entity }),
		clear: () => set({ loading: false, error: false, entity: undefined }),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError }))
	};
};

const entityRelationshipStore = createEntityRelationshipStore();

export default entityRelationshipStore;
