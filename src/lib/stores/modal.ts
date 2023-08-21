// Modal Store Queue

import { writable } from 'svelte/store';

export interface Modal {
    component: any;
    /** Used for accessibility */
    title: string;
}

function modalService() {
	const { subscribe, set, update } = writable<Modal[]>([]);
	return {
		subscribe,
		set,
		update,
		/** Append to end of queue. */
		trigger: (modal: Modal) =>
			update((mStore) => {
				mStore.push(modal);
				return mStore;
			}),
		/**  Remove first item in queue. */
		close: () =>
			update((mStore) => {
				if (mStore.length > 0) mStore.shift();
				return mStore;
			}),
		/** Remove all items from queue. */
		clear: () => set([])
	};
}

export const modalStore = modalService();