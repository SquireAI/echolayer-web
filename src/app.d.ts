// See https://kit.svelte.dev/docs/types#app

import type { httpContext } from '$lib/http/context';
import type { Organization, User } from '$lib/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			org?: Organization;
			user?: User;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
