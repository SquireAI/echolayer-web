import { derived, writable, type Readable } from 'svelte/store';
import type { Member, MemberStore, StoreMemberEntity } from '../types';
import _ from 'lodash';

export const MEMBER_STORE_NAME = 'member';

const initialValue = { loading: false, error: false, entity: undefined };
const memberStore = writable<StoreMemberEntity>(initialValue);

const sortedMemberStore: Readable<StoreMemberEntity> = derived([memberStore], ([$memberStore]) => {
	const { entity } = $memberStore;
	if (!entity || entity.length < 1) return initialValue;
	const sorted = _.sortBy(entity, [
		function (el) {
			return !el.isActive;
		}
	]);
	return {
		...initialValue,
		entity: sorted
	};
});

const { set, update } = memberStore;
const { subscribe } = sortedMemberStore;

const createStore = (): MemberStore => {
	return {
		subscribe,
		update,
		set,
		clear: () => set(initialValue),
		setLoading: (isLoading: boolean) => update((existing) => ({ ...existing, loading: isLoading })),
		setError: (isError: boolean) => update((existing) => ({ ...existing, error: isError })),
		setMembers: (entity: Member[]) => set({ loading: false, error: false, entity })
	};
};

const store = createStore();
export default store;
