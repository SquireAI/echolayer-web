import { writable, derived, type Readable } from "svelte/store";
import type {ComponentEntity, StoreOriginEntity, OriginStore, BaseEntity} from "../types";
import ComponentStore from "./component-store";
import TeamStore from "./team-store";

export const ORIGIN_STORE_NAME = "origin";

const initialValue = { loading: false, error: false, entity: undefined };
const originStore = writable<StoreOriginEntity>(initialValue);

const derivedOriginStore: Readable<StoreOriginEntity> = derived(
	[originStore, ComponentStore, TeamStore],
	([$originStore, $ComponentStore, $TeamStore]) => {
		if (!$originStore.entity || !$ComponentStore.entity || !$TeamStore.entity) return initialValue;
		const derivedOrigin: BaseEntity | undefined = [...$ComponentStore.entity, ...$TeamStore.entity].find((entity: BaseEntity) => {
			return entity.publicId === $originStore?.entity?.publicId;
		});

		return {
			...initialValue,
			entity: derivedOrigin,
		}
	});

const { set, update } = originStore;
const { subscribe } = derivedOriginStore;
const createStore = (): OriginStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setEntity: (entity: BaseEntity) => set({ loading: false, error: false, entity })
	}
};

const store = createStore();
export default store;
