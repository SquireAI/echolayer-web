// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface Platform {}

		interface Locals {
			traceId: string;
			orgId: string | null;
		}
	}
}

export {};
