import type { Updater, Writable } from "svelte/store";

export type User = {
	name: string;
}

export type UserStore = {
	subscribe: Writable<User>["subscribe"],
	update: (this: void, updater: Updater<User>) => void
}