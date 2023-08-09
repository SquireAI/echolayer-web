import { derived, writable, type Readable } from 'svelte/store';
import type { GraphedEntity, SelectedStore, StoreSelectedEntity } from '../types';
import ComponentStore from './component-store';
import TeamStore from './team-store';

export const SELECTED_STORE_NAME = 'selected';

const initialValue = { loading: false, error: false, entity: undefined };
const selectedStore = writable<StoreSelectedEntity>(initialValue);

const derivedSelectedStore: Readable<StoreSelectedEntity> = derived(
	[selectedStore, ComponentStore, TeamStore],
	([$selectedStore, $ComponentStore, $TeamStore]) => {
		if (!$selectedStore.entity || !$ComponentStore.entity || !$TeamStore.entity)
			return initialValue;
		const derivedSelected: GraphedEntity | undefined = [
			...$ComponentStore.entity,
			...$TeamStore.entity
		].find((entity: GraphedEntity) => {
			return entity.publicId === $selectedStore?.entity?.publicId;
		});

		return {
			...initialValue,
			entity: derivedSelected
		};
	}
);

const { set, update } = selectedStore;
const { subscribe } = derivedSelectedStore;
const createStore = (): SelectedStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setEntity: (entity?: GraphedEntity) => set({ loading: false, error: false, entity })
	};
};

const store = createStore();
export default store;
