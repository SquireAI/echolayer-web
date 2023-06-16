<script lang="ts">
	import { getContext } from "svelte";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { OrganizationStore, UserStore } from "../types";


	let userStore: UserStore;
	userStore = getContext("user") as UserStore;

	let orgStore: OrganizationStore;
	orgStore = getContext("org") as OrganizationStore;

	$: if (browser && !$userStore.loading && !$orgStore.loading) {
		if ($userStore.entity && !$orgStore.entity) {
			goto("/app/org/new");
		} else if ($userStore.entity && $orgStore.entity) {
			goto("/app/org");
		}
		if (!$userStore.entity) {
			goto("/sign-in");
		}
	}
</script>